import './userInfo.css'
import defaultAvatar from './../../../assets/avatar.png'
import more from './../../../assets/more.png'
import video from './../../../assets/video.png'
import edit from './../../../assets/edit.png'
import { useUserStore } from '../../../lib/userStore'

function UserInfo(){
    const {currentUser, isLoading, fetchUserInfo} = useUserStore()
    return(
        <div className='userInfo-container'>
            <div className='user'>
                <img src={currentUser.avatar || defaultAvatar} alt='user_avatar' />
                <h2>{currentUser.username}</h2>
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