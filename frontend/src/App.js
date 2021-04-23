import { Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import Menu from "./components/Menu";
import './styles/App.scss';

import Channel from "./views/Channel";
import Home from './views/Home';
import Profile from './views/Profile';

import { SocketContext, socket } from './service/socket.js';

import { useStore } from './store/store.js'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


function App() {

  const currentUser = useStore((state) => state.currentuser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const toggleLogin = useStore((state) => state.toggleLogin);

  const setUsers = useStore((state) => state.setUsers);

  const messages = useStore(state => state.messages);
  const setMessages = useStore((state) => state.setMessages);

  const errorMessage = useStore((state) => state.errorMessage);
  const setErrorMessage = useStore((state) => state.setErrorMessage);

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connection made to server")
    });

    socket.on('disconnect', () => {
      console.log("Connection to server lost")
      socket.removeAllListeners();
    });

    socket.on('login', (user) => {
      if (!user) {
        setErrorMessage('Not correct username or password');
        return;
      }
      setCurrentUser(user);
      if (!isLoggedIn) {
        toggleLogin(isLoggedIn);
      }
    });

    socket.on('logout', () => {
      setCurrentUser({username: '', id: ''});
      if (isLoggedIn) {
        toggleLogin(isLoggedIn);
      }
    })

    socket.on('toast-error', (message) => {
      setErrorMessage(message);
    })
    return () => {
      socket.off('login');
      socket.off('logout');
    }
  }, []);

  useEffect(() => {
    socket.on('new-message', newMessages => {
      setMessages(newMessages);
    });

    socket.on('get-messages', newMessages => {
      setMessages(newMessages);
    });

    return () => {
      socket.off('get-messages');
      socket.off('new-messages');
    }
  }, [messages]);

  const handleClose = () => {
    setErrorMessage('');
  }
  
  //https://stackoverflow.com/questions/50026028/react-how-to-detect-page-refresh-f5
  //This is so the user does not get stuck on the profile page with no home, kinda half logged in
  useEffect(() => {
    window.addEventListener("beforeunload", logout);
    return () => {
      window.removeEventListener("beforeunload", logout);
    };
  }, []);

  const logout = () => {
    socket.emit('logout');
  }

  return (
    <div id="App">
      <Menu />
      <div id="main-area">
        <SocketContext.Provider value={socket}>
          <Snackbar 
            open={errorMessage}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} icon={false}>
              {errorMessage}
            </Alert>
          </Snackbar>

          <Switch>


            <Route 
              path="/general" 
              render={() => ( <Channel name='general' currentUser={currentUser} /> )}
            />
            <Route 
              path="/books" 
              render={() => ( <Channel name='books' /> )}
            />
            <Route 
              path="/gaming" 
              render={() => ( <Channel name='gaming' /> )}
            />

            {!isLoggedIn ? 
              <Route exact path="/" component={Home} />
            : <Route 
              path="/"
              component={Profile}
            />}
          </Switch>
        </SocketContext.Provider>
      </div>
    </div>
  );
}

export default App;
