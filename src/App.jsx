import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Detail from "./components/details/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notificatiion from "./components/notification/Notificatiion"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"

const App = () => {



  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);


    })

    return unSubscribe
  }, [])

  return (
    <div className='container'>
      {
        user ? (<>
          <List></List>
          <Chat></Chat>
          <Detail></Detail>
        </>) : (<Login />)
      }
      < Notificatiion></Notificatiion>

    </div>
  )
}


export default App