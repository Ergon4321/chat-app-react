import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./chatList.css";
import search from "./../../../assets/search.png";
import plus from "./../../../assets/plus.png";
import minus from "./../../../assets/minus.png";
import avatar from "./../../../assets/avatar.png";
import AddUser from "../../addUser/addUser";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    return (
        <div className="chatList-container">
            <div className="search">
                <div className="searchBar">
                    <img src={search} />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={addMode ? minus : plus} alt="plus_icon" className="add" onClick={() => setAddMode((prev) => !prev)} />
            </div>
            <div className="item">
                <img src={avatar} alt="avatar_icon" />
                <div className="texts">
                    <span>Friend Name</span>
                    <p>lattest message</p>
                </div>
            </div>
            <div className="item">
                <img src={avatar} alt="avatar_icon" />
                <div className="texts">
                    <span>Friend Name</span>
                    <p>lattest message</p>
                </div>
            </div>
            
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
