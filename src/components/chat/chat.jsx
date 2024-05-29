import './chat.css'
import avatar from '../../assets/avatar.png'
import phone from '../../assets/phone.png'
import video from '../../assets/video.png'
import info from '../../assets/info.png'
import emoji from '../../assets/emoji.png'
import mic from '../../assets/mic.png'
import camera from '../../assets/camera.png'
import img from '../../assets/img.png'
import EmojiPicker from 'emoji-picker-react'
import { useState, useRef, useEffect } from 'react'

function Chat(){
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")

    const endRef = useRef(null)
    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior: "smooth"})
    },[])

    const handleEmoji = e =>{
        setText(prev=>prev+e.emoji)
    }
    return(
        <div className='chat-container'>
            <div className="top">
                <div className="user">
                    <img src={avatar} alt='avatar_icon'/>
                    <div className="texts">
                        <span>FriendName</span>
                        <p>Description</p>
                    </div>
                </div>
                <div className="icons">
                    <img src={phone} alt='phone_icon'/>
                    <img src={video} alt='video_icon'/>
                    <img src={info} alt='info_icon'/>
                </div>
            </div>
            <div className="center">
                <div className="message own">
                    <div className="texts">
                        <p>This is someones message...</p>
                        <span>time of message</span>
                    </div>
                </div>
                <div className="message">
                    <img src={avatar} />
                    <div className="texts">
                        <p>This is someones veeeeeeeeeeeeery loooooooooooooooooooooooong message...</p>
                        <span>time of message</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>This is someones looooooooooooooooooooooooooong message...</p>
                        <span>time of message</span>
                    </div>
                </div>
                <div className="message">
                    <img src={avatar} />
                    <div className="texts">
                        <p>This is someones message...</p>
                        <span>time of message</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src={img} alt='img_icon'/>
                    <img src={camera} alt='camera_icon'/>
                    <img src={mic} alt='mic_icon'/>
                </div>
                <input type="text" placeholder='Type a message...' value={text} onChange={e=>setText(e.target.value)}/>
                <img src={emoji} onClick={()=>setOpen(prev=>!prev)}/>
                <div className="emoji">
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className='send-button'>Send</button> 
            </div>
        </div>
    )
}

export default Chat