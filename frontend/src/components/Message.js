import React, { useState, useEffect } from 'react'
import '../styles/Message.scss';
import { getUser } from '../fetchRequests';
import { useStore } from '../store/store';

export default function Message({ message, author }) {
  const currentUser = useStore(state => state.currentUser);
  const [mAuthor, setAuthor] = useState(author._id ?
    { username: currentUser.username, _id: currentUser._id}
    : {username: 'Loading...', id: author});

  useEffect(() => {
    /*
      When a new message is created, for whatever
      reason, the newest message sent gets sent back
      with the full author relationship, while
      when they are gotten normally they only
      contain the relationship id. This counts for
      ANY sockets, so you must first check if the
      author constains an id, instead of just
      being an id. Next you need to see if the
      author is the current user, if not, look
      up the username of the other user.
    */

    if (author._id) {
      if (author._id === currentUser._id) {
        setAuthor(currentUser);
        return
      } else {
        getUser(author._id.toString())
        .then(user => {
          setAuthor(user);
        })
        return;
      }
    }

    getUser(mAuthor.id.toString())
    .then(user => {
      setAuthor(user);
    })
    .catch(err => {
      if (err) {
        setAuthor({
          username: '[Deleted User]',
          id: '0'
        });
        return;
      }
    })
  }, [])

  return (
    <div className="message">
      <div className="author-bar">
        {mAuthor.username}
      </div>
      <div className="message-body">
        {message}
      </div>
      {/* <button 
        onClick={(e) => props.handleDelete(e, props.message.id)}>Delete</button> */}
    </div>
  )
}


