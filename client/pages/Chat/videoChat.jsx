import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { connect, createLocalVideoTrack, RemoteParticipant } from 'twilio-video';
import Video from 'twilio-video';
import { Box, TextField, Stack, Typography, Button, Grid } from '@mui/material';
import '../styles/VideoChat.css';

export default function VideoChat() {
  const [connectButton, setConnectButton] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  // // async function setUpLocalVideo() {
  // //   const localVideoTrack = await createLocalVideoTrack();
  // //   const localMediaContainer = document.getElementById('currentUserVideo');
  // //   // localMediaContainer.appendChild(localVideoTrack.attach());
  // //   localTracks.forEach(function(track) {
  // //     localMediaContainer.appendChild(track.attach());
  // //   });
  // // }

  // // useEffect(() => {
  // //   // setUpLocalVideo();
  // // }, []);

  // //* ====================================

  // Video.connect('$TOKEN', { name: 'room-name' }).then(room => {
  //   console.log('Connected to Room "%s"', room.name);

  //   room.participants.forEach(participantConnected);
  //   room.on('participantConnected', participantConnected);

  //   room.on('participantDisconnected', participantDisconnected);
  //   room.once('disconnected', error => room.participants.forEach(participantDisconnected));
  // });

  // function participantConnected(participant) {
  //   console.log('Participant "%s" connected', participant.identity);

  //   const div = document.createElement('div');
  //   div.id = participant.sid;
  //   div.innerText = participant.identity;

  //   participant.on('trackSubscribed', track => trackSubscribed(div, track));
  //   participant.tracks.forEach(track => trackSubscribed(div, track));
  //   participant.on('trackUnsubscribed', trackUnsubscribed);

  //   document.body.appendChild(div);
  // }

  // function participantDisconnected(participant) {
  //   console.log('Participant "%s" disconnected', participant.identity);

  //   participant.tracks.forEach(trackUnsubscribed);
  //   document.getElementById(participant.sid).remove();
  // }

  // function trackSubscribed(div, track) {
  //   div.appendChild(track.attach());
  // }

  // function trackUnsubscribed(track) {
  //   track.detach().forEach(element => element.remove());
  // }


  // //* =====================================

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
