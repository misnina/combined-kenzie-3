import React, { useState } from 'react'
import { socket } from '../service/socket';
import { useStore } from '../store/store';

import { createUser } from '../fetchRequests';

import '../styles/Home.scss';

export default function Home() {
  const setErrorMessage = useStore(state => state.setErrorMessage);
  const setCurrentUser = useStore(state => state.setCurrentUser);

  const isLoggedIn = useStore(state => state.isLoggedIn);
  const toggleLogin = useStore(state => state.toggleLogin);
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signUsername, signSetUsername] = useState('');
  const [signPassword, signSetPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('Please enter in username or password');
      return;
    };

    socket.emit('login', { username: username, password: password });
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    if (!signUsername || !signPassword) {
      setErrorMessage('Please enter in username or password');
      return;
    };

    createUser(signUsername, signPassword)
    .then(user => {
      setCurrentUser(user);
      toggleLogin(isLoggedIn);
    })
  }

  return (
    <div className="home">
      <form onSubmit={handleLogin} className='card'>
        <h2>Login</h2>
        Username: <input 
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        Password: <input 
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <form onSubmit={handleSignUp} className='card'>
        <h2>Sign Up</h2>
        Username: <input 
          value={signUsername}
          onChange={e => signSetUsername(e.target.value)}
        />
        Password: <input 
          type='password'
          value={signPassword}
          onChange={e => signSetPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
