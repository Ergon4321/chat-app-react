import './list.css'
import UserInfo from './userInfoFolder/userInfo'
import ChatList from './chatList/chatList'

const List = () => {
    return(
        <div className='list-container'>
            <UserInfo />
            <ChatList />
        </div>
    )
}

export default List