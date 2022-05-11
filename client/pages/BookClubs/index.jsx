import React, { useState, useEffect } from 'react';
import AllClubs from './AllClubs';
import '../styles/BookClubs.css';
import PopularBookclubs from '../../../fakeData/bookClubs/popularBookclubs'
import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';


export default function BookClubs() {

  const [bookClub, setBookClub] = useState([])
  const [allClubs, setAllClubs] = useState([])
  const { user, setUser, setToken } = useStore();

  const style = {
    'background': 'url(../assets/header-bg.jpg) no-repeat center center fixed'
  }

  const clubImg = { background: `url('${bookClub.imageUrl}') no-repeat center center` }


  const handleUserLogin = () => signInWithGoogle()
    .then((result) => {
      if (!result || !result.user || !result.token) throw result;
      const { user: newUser, token } = result;
      localStorage.setItem('user_data', JSON.stringify(newUser));
      setUser(newUser);
      setToken(token);
    })
    .catch(console.error)

  const renderView = () => {
    if (!user) {
      return <div className='club-of-the-day'>
        <div className='club-left' style={clubImg} />
        <div className='club-right'>
          <h1>CLUB OF THE DAY</h1>
          <h3>{bookClub.bookclubName}</h3>
          <h5>{bookClub.membersCount} Members</h5>
          <p>{bookClub.description}</p>
          <div className='join green-btn'>
            <button type='button' onClick={handleUserLogin}>LOG IN</button>
          </div>
        </div>
      </div>
    }
      return <div className='most-visited-clubs'>LOGGED IN</div>
  }


  useEffect(() => {
    setBookClub(PopularBookclubs.results[0].bookclubInfo);
    setAllClubs(PopularBookclubs.results);
    renderView();
  }, [user])


  return (
    <div className='book-clubs'>
      <div className='header-container'>
        <div className='header' style={style}>
          <div className='filter' />
          <div className='main-content'>
            <div>
              <h1>BOOK CLUBS</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='page-content'>
        <div style={{ 'width': '100%' }}>
          <div className='search-bar'>
            <div className='search'>
              <input />
            </div>
          </div>
          {renderView()}
        </div>
        <div className='allClubs'>
          {
            allClubs.map((club) => <AllClubs club={club} user={user} key={club} />)
          }
        </div>
      </div>
    </div>
  );
}