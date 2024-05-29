import "./login.css";
import React, { useState } from "react";
import avatarDefault from './../../assets/avatar.png'
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from './../../lib/firebase'
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload.js";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const[loading, setLoading] = useState(false)

    const handleAvatar = e =>{
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister = async (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)

        const {username, email, password} = Object.fromEntries(formData)

        // console.log(username, email)
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password) //creating firebase account
            await setDoc(doc(db, "users", response.user.uid), {
                username: username,
                email: email,
                id: response.user.uid,
                blocked: [],
            }); //adding data to user collection

            await setDoc(doc(db, "userchats", response.user.uid), {
                chats: [],
            }); //adding data to chat

            toast.success("Account has been created successfully! You can now login!")
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    };


    const handleLogin = e =>{
        e.preventDefault() //preventing changing page onSubmit
        
    }

    
    
    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading? "Loading" : "Sign In"}</button>
                </form>
            </div>

            <div className="separator"></div>
            <div className="item">
                <h2>Create account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file"><img src={avatar.url || avatarDefault} />Upload an image</label>
                    <input type="file" id="file" hidden onChange={handleAvatar}/>
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
