import './App.css';
import { Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Chats from './pages/Chatpage';
function App() {
  return (
    <div className='App'>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chats} />
    </div>
  );
}

export default App;
