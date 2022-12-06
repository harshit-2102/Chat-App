import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);



  const handleSend = async () => {

    console.log(data.chatId)

    if (img) {

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.email,
                date: Timestamp.now(),
                img: downloadURL,
              })
            })
          })
        }
      )

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.email,
          date: Timestamp.now(),
        })
      })
    }

    setText("");
    setImg(null);

  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
        <iconify-icon icon="ri:image-add-fill" style={{ fontSize: "25px", color:"#8da4f1", cursor:"pointer" }}></iconify-icon>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input