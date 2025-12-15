import EmojiPicker, { Emoji } from 'emoji-picker-react';
import './chat.css'
import { useEffect, useRef, useState } from 'react';

const Chat = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
    const endRef = useRef(null) // Here endRef={current:null}

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const handleEmoji = e => {
        setText(previous => previous + e.emoji)
        setOpen(false)
    }

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>


            <div className="center">
                <div className="message own">
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">

                    <div className="text">
                        <img src="https://i.ibb.co.com/MD4srsJH/Untitled-1.jpg" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                {/* after this div runs endRef={current: something} */}
                <div ref={endRef}></div>
            </div>


            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" value={text} placeholder='Type a message...' onChange={e => setText(e.target.value)} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />

                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton'>Send</button>
            </div>
        </div>
    );
};

export default Chat;