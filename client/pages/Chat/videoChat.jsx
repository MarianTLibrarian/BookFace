import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, createLocalVideoTrack, RemoteParticipant } from 'twilio-video';
import { Box, TextField, Stack, Typography, Button, Grid } from '@mui/material';
import '../styles/VideoChat.css';

export default function VideoChat() {
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
      room: '111',
      userName: 'jp',
    };
    const response = await fetch('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    const roomToken = await response.json();
    return roomToken;
  };

  const connectToRoom = async () => {
    const token = await getToken();
    const conectedRoom = await connect(token, {
      name: '111',
      audio: false,
      video: { width: 1000 },
    });
    if (!activeRoom) {
      setActiveRoom(conectedRoom);
    }
  };

  const leaveVideoChat = async () => {
    await activeRoom.disconnect();
    setConnectButton(false);
  };

  return (
    <div className="room">
      <div id="currentUserVideo"></div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!connectButton ? (
          <Button
            variant="outlined"
            onClick={() => {
              connectToRoom();
              setConnectButton(true);
              getToken();
            }}
          >
            connect
          </Button> //
        ) : null}
        {connectButton ? (
          <Button variant="outlined" onClick={() => leaveVideoChat()}>
            Log out
          </Button>
        ) : null}
      </Box>
    </div>
  );
}
