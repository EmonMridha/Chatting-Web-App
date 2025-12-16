import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Detail from "./components/details/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notificatiion from "./components/notification/Notificatiion"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import { useUserStore } from "./lib/userStore"

const App = () => {

  const { currentUser, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)


    })

    return unSubscribe
  }, [fetchUserInfo])


  return (
    <div className='container'>
      {
        currentUser ? (<>
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