import './detail.css'
import arrowUp from '../../assets/arrowUp.png'
import download from '../../assets/download.png'
import avatar from '../../assets/avatar.png'
import photo from '../../assets/bg.jpg'
import { auth } from '../../lib/firebase'


function Detail(){
    return(
    <div className='detail-container'>
        <div className="user">
            <img src={avatar}/>
            <h2>Friend</h2>
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
            <button>Block User</button>
            <button className='logout' onClick={() => auth.signOut()}>Logout</button>
        </div>
    </div>
    )
}

export default Detail