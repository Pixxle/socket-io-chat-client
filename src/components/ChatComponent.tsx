import React, { useEffect, useRef } from 'react'
import { ChatMessage } from '../App' 


type MessageProp = {
    messages: ChatMessage[]
    colorBlind: boolean
}

type User = {
    color: string
    id: number
    username: string
}

export default function ChatComponent (props: MessageProp) {
    const messages = props.messages
    const colorBlind = props.colorBlind
    const chatContainerRef = useRef<HTMLDivElement>(null);

    function Username({ user }: { user: User }) {
        if (colorBlind) {
            return (
                <span className='text-black font-bold'>{user.username}</span>
            )
        } else {
            return (
                <span style={{ color: user.color}}>{user.username}</span>
            )
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

      
  return (
    <div ref={chatContainerRef} className='overflow-y-scroll'>
        {messages.map((message, index) => (
            <div key={index} className='bg-slate-300'>
                {message.type === "USER_JOINED" &&(
                <div>
                    <Username user={message.user}/> joined the chat
                </div>
                )} 
                {message.type === "USER_LEFT" &&(
                    <div><Username user={message.user}/> left the chat</div>
                )} 
                {message.type === "USER_MESSAGE" && (
                <div><Username user={message.user}/>: {message.message}</div>
                )}
            </div>
        ))}
    </div>
  )
}
