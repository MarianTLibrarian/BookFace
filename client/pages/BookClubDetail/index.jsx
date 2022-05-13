import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import ForumIcon from '@mui/icons-material/Forum';
import MyBookClubs from './MyBookClubs';
import Posts from './Posts';
// import PopularBookclubs from '../../../fakeData/bookClubs/popularBookclubs';
import LiveChat from '../Chat/LiveChat';
import Calendar from './calendar';
import SearchBar from '../../../components/SearchBar';
import '../styles/BookClubDetails.css';
import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';

export default function BookClubDetail() {
  const { user, setUser, setToken, bookclubDetails, usersBookclubs, clubName, popularBookclubs } =
    useStore();
  const [events, setEvents] = useState(null);
  const [chat, setChat] = useState(false);
  const [postBody, setPostBody] = useState('');
  const [posts, setPosts] = useState([]);

  const currentClub = bookclubDetails.filter((club) => club.bookclubInfo.bookclubName === clubName);

  const getEvents = () => {
    axios
      .get('http://localhost:3030/events', {
        params: { bookclubName: currentClub[0].bookclubInfo.bookclubName },
      })
      .then(({ data }) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getEvents();
    setPosts(() =>
      currentClub[0].posts.sort((a, b) => b.postDate.seconds - a.postDate.seconds)
    );
  }, []);

  const addPost = (e) => {
    e.preventDefault();
    setPostBody('');
    const data = {
      userId: user.providerData[0].displayName,
      bookclubName: currentClub[0].bookclubInfo.bookclubName,
      postBody,
      posterUserImg: user.photoURL,
    };

    axios
      .post('http://localhost:3030/bookclubs/messages', data)
      .then((res) => {
        console.log('Your event is posted: ', res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // const result = posts.concat(data);
    const result = [data, ...posts];
    setPosts(result);
  };

  const handleUserLogin = () =>
    signInWithGoogle()
      .then((result) => {
        if (!result || !result.user || !result.token) throw result;
        const { user: newUser, token } = result;
        localStorage.setItem('user_data', JSON.stringify(newUser));
        setUser(newUser);
        setToken(token);
      })
      .catch(console.error);

  const liveChat = () => {
    setChat(!chat);
  };
  const style = {
    background: `url('${currentClub[0].bookclubInfo.imageUrl}') no-repeat center center fixed`,
  };

  const renderChat = () => {
    if (!chat) {
      return (
        <div>
          <div className="write-post">
            <textarea
              placeholder="Leave A Comment..."
              onChange={(e) => setPostBody(e.target.value)}
              value={postBody}
            />
            <div className="submit">
              <div className="submit-btn">
                <SendIcon onClick={addPost} />
              </div>
            </div>
            <div className="club-posts">
              {posts.map((post) => (
                <Posts post={post} key={Math.random()} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="chat-box">
        {clubName ? <LiveChat user={user.displayName} roomName={clubName} /> : null}
      </div>
    );
  };

  const renderView = () => {
    if (user) {
      return (
        <div style={{ width: '100%' }}>
          <div className="club-search-bar">
            <div className="the-first-two-thirds" />
            <div className="club-search">
              <SearchBar />
            </div>
          </div>
          <div className="content-container">
            <div className="content-left">
              <div className="my-clubs">
                <h2>My Book Clubs</h2>
                {usersBookclubs.map((club) => (
                  <MyBookClubs club={club} key={Math.random()} />
                ))}
              </div>

              <div className="upcoming-events">
                <h2>Upcoming Events</h2>

                {events
                  ? events.map((event) => (
                      <div key={Math.random()}>
                        <p>
                          <span style={{ fontWeight: 'bold' }}>Topic: </span>
                          {event.eventTopic}
                        </p>
                        <p>
                          <span style={{ fontWeight: 'bold' }}>Date: </span>
                          {moment(event.eventTime).format('MMMM Do YYYY')}
                        </p>
                        <p>
                          <span style={{ fontWeight: 'bold' }}>Time: </span>
                          {moment(event.eventTime).format('h:mm a')}
                        </p>
                      </div>
                    ))
                  : null}
              </div>

              <div className="create-events">
                <Calendar setEvents={setEvents} events={events} />
              </div>
            </div>

            <div className="content-right">{renderChat()}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="required">
        <div
          className="lock"
          role="button"
          onClick={handleUserLogin}
          onKeyUp={handleUserLogin}
          tabIndex="0"
        >
          <LockIcon />
        </div>
      </div>
    );
  };

  const renderIcon = () => {
    if (user) {
      return (
        <div className="live-chat" role="button" onClick={liveChat} onKeyUp={liveChat} tabIndex="0">
          <div className="icon">
            <ForumIcon />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="book-club-detail">
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <div>
              <h1>{currentClub[0].bookclubInfo.bookclubName}</h1>
              {user ? null : (
                <div className="main-content-btn">
                  <button type="button" onClick={handleUserLogin}>
                    LOG IN
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <div className="text">
          <p>{currentClub[0].bookclubInfo.description}</p>
        </div>
      </div>

      <div className="page-content">{renderView()}</div>
      {renderIcon()}
    </div>
  );
}
