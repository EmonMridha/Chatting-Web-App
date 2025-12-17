import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import './addUser.css'
import { db } from '../../../../lib/firebase';
import { useState } from 'react';
import { useUserStore } from '../../../../lib/userStore';

const AddUser = () => {

    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username')

        try {

            const q = query(collection(db, 'users'), where('username', '==', username));

            const querySnapshot = await getDocs(q); // Fetching documents matching the query and storing here

            if (!querySnapshot.empty) {
                setUser(querySnapshot.docs[0].data());
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleAdd = async () => {

        const chatRef = collection(db, 'chats')
        const userChatsRef = collection(db, 'userchats')

        try {

            const newChatRef = doc(chatRef)

            // Creating a new chat room
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            // Updating the other user's userchats
            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            })

            // Updating my userchats
            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            })

            console.log(newChatRef.id);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>Search</button>
            </form>
            {user && <div className='user'>
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}

        </div>
    );
};

export default AddUser;