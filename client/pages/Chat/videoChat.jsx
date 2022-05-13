import React, { useState, useCallback, useEffect } from 'react';
import '../styles/Chat.css';

import Lobby from './Lobby';
import Room from './Room';

const { Video } = Twilio;

export default function VideoChat({ username, roomName }) {
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const data = await fetch('http://localhost:3030/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      Video.connect(data.token, {
        name: roomName,
      })
        .then((newRoom) => {
          setConnecting(false);
          setRoom(newRoom);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username],
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener('pagehide', tidyUp);
      window.addEventListener('beforeunload', tidyUp);
      return () => {
        window.removeEventListener('pagehide', tidyUp);
        window.removeEventListener('beforeunload', tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = <Room roomName={roomName} room={room} handleLogout={handleLogout} />;
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return render;
}
