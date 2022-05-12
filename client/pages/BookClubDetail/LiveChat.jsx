import { useState, useEffect } from "react";
import Chat from "./ChatRoom";
import io from "socket.io-client";
import { Box, TextField, Stack, Typography, Button, Grid } from '@mui/material'
import {
  connect,
  createLocalVideoTrack,
  RemoteParticipant,
} from 'twilio-video';
const socket = io.connect("http://localhost:3030");

export default function LiveChat() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };


  const [connectButton, setConnectButton] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);


  async function setUpLocalVideo() {
    const localVideoTrack = await createLocalVideoTrack();
    const localMediaContainer = document.querySelector('#currentUserVideo');
    localMediaContainer.appendChild(localVideoTrack.attach());
  }

  useEffect(() => {
    setUpLocalVideo();
  }, []);

  const getToken = async () => {
    const data = {
      room: "111",
      userName: "jp",
    }
    const response = await fetch('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    const roomToken = await response.json();
    return roomToken
  }


  const connectToRoom = async () => {
    const token = await getToken();
    const conectedRoom = await connect(token, {
      name: '111',
      audio: false,
      video: { width: 1000 }
    })
    if (!activeRoom) {
      setActiveRoom(conectedRoom);
    }
  }

  const leaveVideoChat = async () => {
    await activeRoom.disconnect();
    setConnectButton(false)
  }

  return (
    <div>
      <div className='chat-container'>
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Club Name"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Club</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>

      <div className="room">
        <div id="currentUserVideo">

        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {!connectButton ?
            <Button variant="outlined" onClick={() => { connectToRoom(); setConnectButton(true); getToken(); }} >connect</Button>//
            :
            null
          }
          {connectButton ? <Button variant="outlined" onClick={() => leaveVideoChat()}>Log out</Button>
            : null
          }
        </Box>

      </div>
    </div>
  );
}
