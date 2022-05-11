import React, { useState, useEffect, useRef } from 'react';
import AllClubs from './AllClubs';
import Carousel from './Carousel'
import '../styles/BookClubs.css';
import PopularBookclubs from '../../../fakeData/bookClubs/popularBookclubs'
import PersonalBookClubs from '../../../fakeData/bookClubs/personalBookclubs'
import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function BookClubs() {

  const [bookClub, setBookClub] = useState([])
  const [allClubs, setAllClubs] = useState([])
  const [myBookClubs, setMyBookClubs] = useState([])
  const { user, setUser, setToken } = useStore();
  const [imgStyle, setImgStyle] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const ref = useRef(null);

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


  const measureWidth = (width) => {
    setImgWidth(width)
  }

  const handleNext = () => {
    if (Math.abs(imgStyle) < (myBookClubs.length * imgWidth - ref.current.offsetWidth)) {
      setImgStyle(imgStyle - imgWidth)
    }
  }

  const handlePrev = () => {
    if (imgStyle !== 0) {
      setImgStyle(imgStyle + imgWidth)
    }
  }

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
    return <div>
      <div className='club-btns'>
        <div className='prev'>
          <button onClick={handlePrev} type='button'><ArrowBackIosIcon /></button>
        </div>
        <div className='next'>
          <button onClick={handleNext} type='button'><ArrowForwardIosIcon /></button>
        </div>
      </div>
      <div className='my-book-clubs-container' ref={ref} >
        <div className="my-book-clubs" style={{ transform: `translate(${imgStyle}px)` }}>
          {myBookClubs.map(club => <Carousel width={measureWidth} club={club} key={club.bookclubInfo.bookclubName} />)}
        </div>
      </div></div>
  }


  useEffect(() => {
    setBookClub(PopularBookclubs.results[0].bookclubInfo);
    setAllClubs(PopularBookclubs.results);
    setMyBookClubs(PersonalBookClubs)
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
        <div style={{ 'width': '100%', 'position': 'relative' }}>
          <div className='search-bar'>
            <div className='search'>
              <input />
            </div>
          </div>
          {renderView()}
        </div>
        <div className='allClubs'>
          {
            allClubs.map((club) => <AllClubs club={club} user={user} key={club.bookclubInfo.bookclubName} />)
          }
        </div>
      </div>
    </div>
  );
}
