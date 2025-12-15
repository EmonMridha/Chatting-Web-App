import Chat from "./components/chat/Chat"
import Detail from "./components/details/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notificatiion from "./components/notification/Notificatiion"

const App = () => {

  const user = true

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