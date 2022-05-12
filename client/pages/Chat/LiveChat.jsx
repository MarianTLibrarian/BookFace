import React, { useEffect } from 'react';
import io from "socket.io-client";
import Chat from "./ChatRoom";

const socket = io.connect("http://localhost:3030");

export default function LiveChat({ user, roomName }) {

  const joinRoom = () => {
    if (user !== "" && roomName !== "") {
      socket.emit("join_room", roomName);
    }
  };

  useEffect(()=>{
    joinRoom();
  }, [])

  return (
    <div className='chat-container'>
        <div className="joinChatContainer">
        <Chat socket={socket} username={user} room={roomName} />
    </div>
    </div>
  );
}
