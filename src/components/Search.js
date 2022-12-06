import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, query, where, getDoc, getDocs, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';



const Search = () => {

  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "user-profile"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch {
      setError(true);
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {

    const combinedId = currentUser.email > user.email ? currentUser.email + user.email : user.email + currentUser.email;

    const currentRef = doc(db, "user-profile", currentUser.email);
    const docSnap = await getDoc(currentRef);
    setCurrent(docSnap.data());

    try {
      setError(false)
      const docRef = doc(db, "chats", combinedId);
      const res = await getDoc(docRef);

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        })
        await updateDoc(doc(db, "user-chats", currentUser.email), {
          [user.email]: {
            userInfo: {
              uid: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        });
        console.log(current.email)
        await updateDoc(doc(db, "user-chats", user.email), {
          [current.email]: {
            userInfo: {
              uid: current.email,
              displayName: current.displayName,
              photoURL: current.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }
    } catch {
      setError(true)
    }

    setUser(null);
    setUsername('');
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='find user' onChange={e => setUsername(e.target.value)} value={username} onKeyDown={handleKey} />
      </div>
      {error && <Alert variant='danger'>User not found</Alert>}
      {
        user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>
              {user.displayName}
            </span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search