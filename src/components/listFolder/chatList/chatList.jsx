import { useEffect, useState } from "react";
import "./chatList.css";
import search from "./../../../assets/search.png";
import plus from "./../../../assets/plus.png";
import minus from "./../../../assets/minus.png";
import avatar from "./../../../assets/avatar.png";
import AddUser from "../../addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        if (!currentUser?.id) return;

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats || []; // Ensure items is an array

            const promises = items.map(async (item) => {
                if (!item.receiverId) {
                    console.error("receiverId is undefined for item:", item);
                    return null;
                }
                
                const userDocRef = doc(db, "users", item.receiverId); // Creating doc reference
                const userDocSnap = await getDoc(userDocRef); // Fetching doc

                const user = userDocSnap.data(); // Fetching data

                return { ...item, user }; // Combined chat and user data to get img etc.
            });

            const chatData = await Promise.all(promises);
            const filteredChatData = chatData.filter(chat => chat !== null); // Remove null values

            setChats(filteredChatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser?.id]);

    const handleSelect = async (chatId, chat) => {
        const userChats = chats.map(item => {
            const { user, ...rest } = item;
            return rest;
        });
    
        const chatIndex = userChats.findIndex(item => item.chatId === chatId);
        userChats[chatIndex].isSeen = true;
        const userChatsRef = doc(db, 'userchats', currentUser.id);
        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            });
            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <div className="chatList-container">
            <div className="search">
                <div className="searchBar">
                    <img src={search} alt="search_icon" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? minus : plus}
                    alt="plus_icon"
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chats.map((chat) => (
                <div
                    className={`item ${chat?.isSeen ? '' : 'unread'}`}
                    key={chat.chatId}
                    onClick={() => handleSelect(chat.chatId, chat)}
                >
                    <img src={chat.user.avatar || avatar} alt="avatar_icon" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
