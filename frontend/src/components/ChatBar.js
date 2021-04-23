import React, { useState } from 'react'
import { StaticRouter } from 'react-router';
import { socket } from '../service/socket';
import { useStore } from '../store/store.js';


export default function ChatBar({ name }) {
  const [message, setMessage] = useState('');
  const currentUser = useStore(state => state.currentUser);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function sendMessage(e) {
    e.preventDefault();
    socket.emit('new-message', { channelName: name, message: message, user: currentUser});
    setMessage('');
  }

  return (
    <div className="chat-bar">
      <form onSubmit={sendMessage}>
        <input 
          value={message} 
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
