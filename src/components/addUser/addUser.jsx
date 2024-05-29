import React from "react"
import './addUser.css'
import avatar from './../../assets/avatar.png'

const addUser = () => {
  return (
    <div className="addUser-container">
      <form>
        <input type="text" placeholder="Username" name="username"/>
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
           <img src={avatar}/>
           <span>Potential Friend Name</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  )
};

export default addUser;
