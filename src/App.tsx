import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatComponent from "./components/ChatComponent";

const CHAT_SERVER_URL = "127.0.0.1:3000" //default local port

const connectChatServer = () => {
  const socket = io(CHAT_SERVER_URL);
  return socket;
};

export type ChatMessage = {
  type: string;
  message: string;
  user: any;
};

export type User = {
  color: string
  id: number
  username: string
}


function App() {

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState<string>("")
  const [colorBlind, setColorBlind] = useState<boolean>(false) 
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = connectChatServer();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() !== "" && socket) {
      socket.emit("user_message", input);
      setInput("");
    }
  };
  
  useEffect(() => {
    if (socket) {
      socket.onAny((type: string, message: string, user: any) => {
        setMessages((prevMessages) => [...prevMessages, { type, message, user }]);
      });
    }
  }, [socket]);


  return (
    <div className="w-screen h-screen bg-slate-800 flex flex-col">
      <h1 className="text-white text-2xl">Worlds best chat app</h1>
      <p className="text-white">Let's create an awesome chat client</p>
      <label className="text-white">
        Color blind?
        <input
          type="checkbox"
          name="checkbox"
          checked={colorBlind}
          onChange={(e) => setColorBlind(e.target.checked)}
        />
      </label>
      <ChatComponent 
        messages={messages}
        colorBlind={colorBlind}
      />
      <div className="mt-auto flex">
        <input 
          type="text" 
          placeholder="Write a message" 
          className="w-4/5 h-10 pl-2"
          value={input}
          onChange={(e) => {setInput(e.target.value)}}
        />
        <button 
          onClick={handleSendMessage} 
          className="text-white flex-1 bg-sky-400 hover:bg-sky-500 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
