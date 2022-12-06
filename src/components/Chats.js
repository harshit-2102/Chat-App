import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

const Chats = () => {

  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "user-chats", currentUser.email), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.email && getChats();
  }, [currentUser.email]);

  const handleSelect= (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }
  console.log("---")
  Object.entries(chats).map((chat) => (
    console.log(chat[1].com.date)
  ))

  return (
    <div className='chats'>
      {
        chats && Object.entries(chats).sort((a,b) => b[1].com.date - a[1].com.date).map((chat) => (
          <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].com.userInfo)}>
            <img src={chat[1].com.userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>
                {chat[1].com.userInfo.displayName}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Chats