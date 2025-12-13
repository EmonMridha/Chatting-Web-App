import Chat from "./components/chat/Chat"
import Detail from "./components/details/Detail"
import List from "./components/list/List"

const App = () => {
  return (
    <div className='container'>
      <List></List>
      <Chat></Chat>
      <Detail></Detail>
    </div>
  )
}


export default App