import React, { useEffect, useRef } from 'react'
import ChatBar from '../components/ChatBar'
import Message from '../components/Message';
import { getChannelMessages } from '../fetchRequests';

import { useStore } from '../store/store.js'
import { socket } from '../service/socket.js'

import '../styles/Channel.scss';

export default function Channel({ name }) {
  const messages = useStore((state) => state.messages);
  const isLoggedIn = useStore(state => state.isLoggedIn);

  const moveBottom = useRef(null);

  useEffect(() => {
    socket.emit('join-channel', name);
    socket.emit('get-messages', name);
    return () => {
      socket.emit('leave-channel', name)
    }
  }, [name]);

  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const scrollToBottom = () => {
    moveBottom.current?.scrollIntoView({ behavior: "smooth" })
  }

  socket.on('new-message', (message) => {
    scrollToBottom()
  });

  return (
    <div className="channel">
      <div className="messages">
        {messages && messages.slice(-15).map((message, i) => {
          return (<Message
          author={message.author}
          message={message.text}
          key={`message-${message._id}`}
        />)
        })}
      </div>
      {isLoggedIn ? <ChatBar name={name} /> : ''}
      <div ref={moveBottom}/>
    </div>
  )
}
