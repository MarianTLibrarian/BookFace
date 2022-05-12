import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoChat from '../Chat/videoChat';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [clicked, setClicked] = useState(false);
  // const [userToken, setUserToken] = useState();

  // To do: use this state to render video chat button accordingly
  const [connected, setConnection] = useState(false);

  const postToken = () => {
    const data = {
      room: 'currentRoom',
      userName: 'currentUserName',
    };
    axios
      .post('/token', data)
      .then((res) => {
        console.log('POST RES ON CLIENT SIDE', res);
      })
      .catch((err) => {
        console.log('ERR in ChatRoom:', err.message);
      });
  };

  useEffect(() => {
    postToken();
  });

  // Video Chat button: click to connect
  const handleClick = (e) => {
    setClicked(!clicked);
    // connectToRoom();
    // setConnection(true);
    // getToken();
    console.log('connected');
  };

  const sendMessage = () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      socket.emit('send_message', messageData);
      setMessageList(messageList.concat(messageData));
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList(messageList.concat(data));
    });
  }, [socket, messageList]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
        <button type="submit" className="videoRoom" onClick={handleClick}>
          Video Chat
        </button>
      </div>
      {clicked && (
        <div className="message-container">
          <VideoChat />
        </div>
      )}
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent) => (
            <div className="message" id={username === messageContent.author ? 'you' : 'other'}>
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
