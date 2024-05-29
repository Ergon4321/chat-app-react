import './userInfo.css'
import avatar from './../../../assets/avatar.png'
import more from './../../../assets/more.png'
import video from './../../../assets/video.png'
import edit from './../../../assets/edit.png'

function UserInfo(){
    return(
        <div className='userInfo-container'>
            <div className='user'>
                <img src={avatar} alt='user_avatar' />
                <h2>UserName</h2>
            </div>
            <div className='icons'>
                <img src={more} alt='more_icon'/>
                <img src={video} alt='more_icon'/>
                <img src={edit} alt='more_icon'/>
            </div>
        </div>
    )
}

export default UserInfo;