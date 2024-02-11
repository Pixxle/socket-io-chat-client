import React from 'react'
import { ChatMessage } from '../App' 


type MessageProp = {
    messages: ChatMessage[]
}

export default function ChatComponent (props: MessageProp) {
    const messages = props.messages
      
  return (
    <div>
        {messages.map((message, index) => (
            <div key={index} style={{ backgroundColor: message.user.color}}>
                {message.type === "USER_JOINED" &&(
                <div>{message.user.username} joined the chat</div>
                )} 
                {message.type === "USER_LEFT" &&(
                    <div>{message.user.username} left the chat</div>
                )} 
                {message.type === "USER_MESSAGE" && (
                <div>{message.user.username}: {message.message}</div>
                )}
            </div>
        ))}
    </div>
  )
}
