import React, { useEffect, useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
// import VideoChat from '../Chat/VideoChat';
import VideoChat from './videoChat'

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const sendMessage = () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()  }:${  new Date(Date.now()).getMinutes()}`,
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
          <VideocamIcon />
        </button>
      </div>
      {clicked && (
        <div className="message-container">
          <VideoChat username={username} roomName={room} />
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
          placeholder="Say something here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} type="button">
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default Chat;
