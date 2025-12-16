import { useEffect, useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser'
import { useUserStore } from '../../../lib/userStore'
import { doc, DocumentReference, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
export default function ChatList() {

    const [chats, setChats] = useState([])
    const [addMode, setAddMode] = useState(false)
    const { currentUser } = useUserStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'userChats', currentUser.id), async (res) => {
            const items = doc.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, 'users', item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data()

                return { ...item, user };
            });

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub()
        }
    }, [currentUser.id])

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
                chats.map((chat) => {
                    <div key={chat.chatId} className="item">
                        <img src='./avatar.png' alt='' />
                        <div className="texts">
                            <span>Jane Doe</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                })
            }


            {addMode && <AddUser></AddUser>}
        </div>
    )
}
