import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext';
import { db } from '../firebase';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [ user, setUser ] = useState([]);

  const ref = useRef();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "user-profile", currentUser.email), (doc) => {
      setUser(doc.data());
    })

    return () => {
      unSub();
    }
  }, [])

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"});
  }, [message])

  return (
    <div className={`message ${message.senderId === currentUser.email && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.email ? user.photoURL : data.user.photoURL} alt="" />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message