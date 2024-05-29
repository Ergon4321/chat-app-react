import "./login.css";
import React, { useState } from "react";
import avatarDefault from './../../assets/avatar.png'
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from './../../lib/firebase'
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload.js";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const[loading, setLoading] = useState(false) //blocking button during upload proccess

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
        setLoading(true) //blocking submit button
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)

        // console.log(username, email)
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password) //creating firebase account

            const imgUrl = await upload(avatar.file) //uploading image
            await setDoc(doc(db, "users", response.user.uid), {
                username: username,
                email: email,
                avatar: imgUrl,
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
        } finally{
            setLoading(false) //unlock submit button
        }
    };


    const handleLogin = async (e) =>{
        e.preventDefault() //preventing changing page onSubmit
        setLoading(true)

        const formData = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData)

        try{
            await signInWithEmailAndPassword(auth, email, password)
        }catch(err){
            console.log(err)
            toast.success(err.message)
        } finally{
            setLoading(false)
        }
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
