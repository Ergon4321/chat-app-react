import "./chat.css";
import avatar from "../../assets/avatar.png";
import phone from "../../assets/phone.png";
import video from "../../assets/video.png";
import info from "../../assets/info.png";
import emoji from "../../assets/emoji.png";
import mic from "../../assets/mic.png";
import camera from "../../assets/camera.png";
import img from "../../assets/img.png";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

function Chat() {
    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const { currentUser } = useUserStore();
    const { chatId, user } = useChatStore();

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };
    }, [chatId]);

    console.log(chat);

    const handleSend = async () => {
        if (text === "") return;

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                }),
            });

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats,
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
    };
    return (
        <div className="chat-container">
            <div className="top">
                <div className="user">
                    <img src={avatar} alt="avatar_icon" />
                    <div className="texts">
                        <span>FriendName</span>
                        <p>Description</p>
                    </div>
                </div>
                <div className="icons">
                    <img src={phone} alt="phone_icon" />
                    <img src={video} alt="video_icon" />
                    <img src={info} alt="info_icon" />
                </div>
            </div>
            <div className="center">
                {chat?.messages?.map((message, index) => {
                    return (
                        <div className="message own" key={index}>
                            <div className="texts">
                                {message.img && <img src={message.img} />}
                                <p>{message.text}</p>
                                {/* <span>{message.createdAt}</span> */}
                            </div>
                        </div>
                    );
                })}

                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src={img} alt="img_icon" />
                    <img src={camera} alt="camera_icon" />
                    <img src={mic} alt="mic_icon" />
                </div>
                <input type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
                <img src={emoji} onClick={() => setOpen((prev) => !prev)} />
                <div className="emoji">
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className="send-button" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
