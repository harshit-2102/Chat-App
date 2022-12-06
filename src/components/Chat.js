import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../contexts/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <iconify-icon icon="ph:video-camera-fill" style={{ fontSize: "20px" }}></iconify-icon>
          <iconify-icon icon="fluent-mdl2:add-friend" style={{ fontSize: "20px" }}></iconify-icon>
          <iconify-icon icon="mdi:dots-horizontal" style={{ fontSize: "20px" }}></iconify-icon>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
