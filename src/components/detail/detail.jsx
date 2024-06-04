import './detail.css'
import arrowUp from '../../assets/arrowUp.png'
import download from '../../assets/download.png'
import avatarDefault from '../../assets/avatar.png'
import photo from '../../assets/bg.jpg'
import { auth } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from "../../lib/firebase";

function Detail(){

    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} =
    useChatStore();
    const {currentUser } = useUserStore();


    const handleBlock = async () => {
        if(!user) return;

        const userDocRef = doc(db, "users", currentUser.id)
        try{
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)

            });
            changeBlock()
        }catch(err){
            console.log(err)
        }
    }

    return(
    <div className='detail-container'>
        <div className="user">
            <img src={user?.avatar || avatarDefault}/>
            <h2>{user?.username}</h2>
            <p>Description</p>
        </div>
        <div className="info">
            <div className="option">
                <div className="title">
                    <span>Chat Settings</span>
                    <img src={arrowUp} />
                </div>
            </div>
            <div className="option">
                <div className="title">
                    <span>Privacy</span>
                    <img src={arrowUp} />
                </div>
            </div>
            <div className="option">
                <div className="title">
                    <span>Shared photos</span>
                    <img src={arrowUp} />
                </div>
                <div className="photos">
                    <div className="photoItem">
                        <div className="photoDetail">
                            <img src={photo} width={100}/>
                            <span>Photo_2024_2.png</span>
                        </div>
                        <img className='download-button' src={download} />
                    </div>
                    <div className="photoItem">
                        <div className="photoDetail">
                            <img src={photo} width={100}/>
                            <span>Photo_2024_2.png</span>
                        </div>
                        <img className='download-button' src={download} />
                    </div>
                </div>
            </div>
            <div className="option">
                <div className="title">
                    <span>Shared Files</span>
                    <img src={arrowUp} />
                </div>
            </div>
            <button onClick={handleBlock}>{isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User blocked" : "Block User"}</button>
            <button className='logout' onClick={() => auth.signOut()}>Logout</button>
        </div>
    </div>
    )
}

export default Detail