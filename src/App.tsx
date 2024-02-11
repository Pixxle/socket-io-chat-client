import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatComponent from "./components/ChatComponent";

const CHAT_SERVER_URL = "127.0.0.1:3000" //default local port

const connectChatServer = () => {
  const socket = io(CHAT_SERVER_URL);
  // socket.onAny((type: string, message: string, user: any) => console.log(type, message, user));
  return socket;
};

export type ChatMessage = {
  type: string;
  message: string;
  user: any;
};


function App() {

  const [messages, setMessages] = useState<ChatMessage[]>([])


  useEffect(() => {
    const socket = connectChatServer()
    socket.onAny((type: string, message: string, user: any) => {
      setMessages((prevMessages) => [...prevMessages, {type, message, user}]);
    });
  }, [])

  console.log(messages)

  return (
    <div className="w-screen h-screen bg-slate-800">
      <h1 className="text-white text-2xl">Worlds best chat app</h1>
      <p className="text-white">Let's create an awesome chat client</p>

      <ChatComponent messages={messages}/>
    </div>
  );
}

export default App;
