import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video from 'twilio-video';
import '../styles/VideoChat.css';

export default function VideoChat() {

  const [userToken, setUserToken] = useState();

  const getToken = (uid) => {
    axios
      .get('/token')
      .then(({ data }) => {
        const { identity, token } = data;
        setUserToken({identity, token})
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="video-chat-container">
      THIS
    </div>
  )
}