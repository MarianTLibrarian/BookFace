import React, { useState } from 'react';
import io from "socket.io-client";
import Chat from "./ChatRoom";

const socket = io.connect("http://localhost:3030");

export default function LiveChat({ user, roomName }) {
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (user !== "" && roomName !== "") {
      socket.emit("join_room", roomName);
      setShowChat(true);
    }
  };

  return (
    <div className='chat-container'>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Live Chat</h3>
          <button onClick={joinRoom}>Join A Club</button>
        </div>
      ) : (
        <Chat socket={socket} username={user} room={roomName} />
      )}
    </div>
  );
}
