import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase';

const Navbar = () => {

  const { logout } = useAuth();
  const { currentUser } = useContext(AuthContext);
  const nav = useNavigate();
  const [userData, setUserData] = useState([]);
  const userCollection = collection(db, "user-profile")

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();

  }, [])

  const name = userData.filter((doc) => {
    if (currentUser.email === doc.id) {
      return doc
    }
  }).map((doc) => (doc.displayName))

  const photo = userData.filter((doc) => {
    if (currentUser.email === doc.id) {
      return doc
    }
  }).map((doc) => (doc.photoURL))

  async function handleLogout() {
    try {
      await logout()
      nav("/")
    } catch {

    }
  }

  return (
    <div className='navbar'>
      <span className='logo'>ChatsApp</span>
      <div className="user">
        <img src={photo} alt="" />
        <span>{name}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar