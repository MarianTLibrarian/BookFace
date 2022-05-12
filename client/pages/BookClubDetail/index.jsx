import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import ForumIcon from '@mui/icons-material/Forum';
import MyBookClubs from './MyBookClubs';
import Posts from './Posts';
// import PopularBookclubs from '../../../fakeData/bookClubs/popularBookclubs';
import LiveChat from './LiveChat'
import Calendar from './Calendar';
import '../styles/BookClubDetails.css';
import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';



export default function BookClubDetail() {
  const [myClub, setMyClub] = useState(null);
  const {user, setUser, setToken, bookclubDetails, usersBookclubs } = useStore();
  const [events, setEvents] = useState(null)
  const [chat, setChat] = useState(false)
  const [clubName, setClubNames] = useState(null);


  const getEvents = () => {
    axios.get('http://localhost:3030/events', { params: { bookclubName: bookclubDetails.bookclubName } })
      .then(({ data }) => {
        setEvents(data)
      })
      .catch(err => {
        console.error(err);
      })
      setEvents(events)
  }


  // const getEvents = () => {
  //   axios.get('http://localhost:3030/events', { params: { bookclubName: bookclubDetails.bookclubName } })
  //     .then(({ data }) => {
  //       setEvents(data)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  //     setEvents(events)
  // }


  const getBookclubs = (id) => {
    axios
      .get('http://localhost:3030//myBookclubs', { params: { userId: id }})
      .then(({ data }) => {
        // console.log('bookclubs', data);
        setClubNames(data.results);

        const temp = [];
        for (let i = 0; i < data.results.length; i += 1) {
          temp.push(data.results[i].bookclubInfo.bookclubName);
        }
        setClubNames(temp);

      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    getEvents();
    getBookclubs('qwew')
  }, [])


  const handleUserLogin = () => signInWithGoogle()
    .then((result) => {
      if (!result || !result.user || !result.token) throw result;
      const { user: newUser, token } = result;
      localStorage.setItem('user_data', JSON.stringify(newUser));
      setUser(newUser);
      setToken(token);
    })
    .catch(console.error)


  const liveChat = () => {
    setChat(!chat)
  }
  const style = {
    background: `url('${bookclubDetails.bookclubInfo.imageUrl}') no-repeat center center fixed`
  }

  const renderChat = () => {
    if (!chat) {
      return <div>
        <div className='write-post'>
          <textarea placeHolder='Leave A Comment...' />
          <div className='submit'>
            <div className='submit-btn'>
              <SendIcon />
            </div>
          </div>
        </div>
        <div className='club-posts'>
          {bookclubDetails.posts.map(post =>
            <Posts post={post} key={post} />
          )}
        </div>
      </div>
    }
    return <div className='chat-box'>
     <LiveChat />
    </div>
  }

  const renderView = () => {
    if (user) {
      return <div style={{ 'width': '100%' }}>
        <div className='search-bar'>
          <div className='search'>
            <input />
          </div>
        </div>
        <div className='content-container'>
          <div className='content-left'>
            <div className='my-clubs'>
              <h2>My Book Clubs</h2>
              {/* {clubName.map(club =>
                <MyBookClubs club={club} key={club} />
              )} */}
            </div>

            <div className='upcoming-events'>
              <h2>Upcoming Events</h2>

              {
                events ?
                  events.map((event) =>

                      <div key={Math.random()}>
                        <p>
                          <span style={{fontWeight:'bold'}}>Topic: </span>
                          {event.eventTopic}
                        </p>
                        <p>
                          <span style={{fontWeight:'bold'}}>Date: </span>
                          {moment( event.eventTime).format('MMMM Do YYYY') }
                        </p>
                        <p>
                          <span style={{fontWeight:'bold'}}>Time: </span>
                          {moment(event.eventTime).format( 'h:mm a')}
                        </p>

                     </div>
                  )
                  : null
              }

            </div>

            <div className='create-events'>
              <Calendar setEvents={setEvents} events={events} />
            </div>
          </div>

          <div className='content-right'>
            {renderChat()}
          </div>
        </div>
      </div>
    }

    return <div className='required'>
      <div className='lock' role='button' onClick={handleUserLogin} onKeyUp={handleUserLogin} tabIndex='0'>
        <LockIcon />
      </div>
    </div>
  }

  const renderIcon = () => {
    if (user) {
      return <div className='live-chat' role='button' onClick={liveChat} onKeyUp={liveChat} tabIndex='0'>
        <div className='icon'>
          <ForumIcon />
        </div>
      </div>
    }
    return null;
  }

  return (
    <div className='book-club-detail'>
      <div className='header-container'>
        <div className='header' style={style}>
          <div className='filter' />
          <div className='main-content'>
            <div>
              <h1>{bookclubDetails.bookclubInfo.bookclubName}</h1>
              {user ? null : <div className='main-content-btn'>
                <button type='button' onClick={handleUserLogin}>LOG IN</button>
              </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <div className="text">
          <p>
            {bookclubDetails.bookclubInfo.description}
          </p>
        </div>
      </div>

      <div className='page-content'>
        {renderView()}
      </div>
      {renderIcon()}
    </div>
  );
}

