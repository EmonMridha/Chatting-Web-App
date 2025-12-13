import ChatList from './chatList/ChatList';
import './list.css'
import UserInfo from './userInfo/UserInfo';

const List = () => {
    return (
        <div className='list'>
            <UserInfo></UserInfo>
            <ChatList></ChatList>
        </div>
    );
};

export default List;