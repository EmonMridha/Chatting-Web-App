import { useEffect, useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser'
import { useUserStore } from '../../../lib/userStore'
import { doc, DocumentReference, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore'
export default function ChatList() {

    const [chats, setChats] = useState([])
    const [addMode, setAddMode] = useState(false)
    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => { // keep watching this document. Whenever ANYTHING changes, sends the latest data in 'res'. Think userchats as chat rooms
            const items = res.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, 'users', item.receiverId);
                const userDocSnap = (await getDoc(userDocRef)); // Fetching the user document and storing here

                if (!userDocSnap.exists()) return null;

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub()
        }
    }, [currentUser.id])

    const handleSelect = async(chat) => {

        changeChat(chat.chatId, chat.user)
    }

    return (
        <div className='chatList'>
            <div className='search'>
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder='Search' />
                </div>
                <img onClick={() => setAddMode((previous) => !previous)} src={addMode ? "./minus.png" : "./plus.png"} className='add' alt="" />
            </div>

            {
                chats.map((chat) => (
                    <div key={chat.chatId} className="item" onClick={()=>handleSelect(chat)}>
                        <img src='./avatar.png' alt='' />
                        <div className="texts">
                            <span>{chat.user.username}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))
            }


            {addMode && <AddUser></AddUser>}
        </div>
    )
}
