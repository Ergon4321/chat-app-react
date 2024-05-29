import "./App.css";
import List from "./components/listFolder/list";
import Chat from "./components/chat/chat";
import Detail from "./components/detail/detail";
import Login from "./components/login/login";
import Notification from "./components/notification/notification";

function App() {

    const user = false
    
    return (
        <div className="container">
            {
                user ? (
                    <>
                        <List />
                        <Chat />
                        <Detail />
                    </> 
                ) : (<Login />)
            }
           <Notification />
        </div>
    );
}

export default App;
