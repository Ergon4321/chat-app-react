import { useState } from "react";
import "./addUser.css";
import defaultAvatar from "./../../assets/avatar.png";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../lib/firebase';
import { useUserStore } from "../../lib/userStore";

const AddUser = () => {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setUser(querySnapshot.docs[0].data());
            } else {
                setUser(null); // Reset user if no match is found
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddUser = async () => {
        if (!user || !currentUser?.id) return;

        const chatRef = collection(db, "chats");
        const userChatRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id, // Fixed typo
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id, // Fixed typo
                    updatedAt: Date.now(),
                })
            });

            console.log(newChatRef.id);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="addUser-container">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button type="submit">Search</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || defaultAvatar} alt="User Avatar" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAddUser}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
