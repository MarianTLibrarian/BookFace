import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useRef, useState } from 'react';
import { signInWithGoogle } from '../../../components/Firebase';
import SearchBar from '../../../components/SearchBar';
import PersonalBookClubs from '../../../fakeData/bookClubs/personalBookclubs';
import PopularBookclubs from '../../../fakeData/bookClubs/popularBookclubs';
import useStore from '../../userStore';
import '../styles/BookClubs.css';
import AllClubs from './AllClubs';
import Carousel from './Carousel';

const filterOptions = { clubs: 'Clubs', myClubs: 'My Clubs' };

export default function BookClubs() {

  const { user, setUser, setToken, searchQuery, bookclubDetails, popularBookclubs } = useStore();




  const [bookClub, setBookClub] = useState([]);
  const [allClubs, setAllClubs] = useState([]);
  const [renderedClubs, setRenderedClubs] = useState(<div className="loading">Loading ...</div>);
  const [myBookClubs, setMyBookClubs] = useState([]);

  const [imgStyle, setImgStyle] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const ref = useRef(null);

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  const clubImg = { background: `url('${bookClub.imageUrl}') no-repeat center center` };

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

  const measureWidth = (width) => {
    setImgWidth(width);
  };

  const handleNext = () => {
    if (Math.abs(imgStyle) < myBookClubs.length * imgWidth - ref.current.offsetWidth) {
      setImgStyle(imgStyle - imgWidth);
    }
  };

  const handlePrev = () => {
    if (imgStyle !== 0) {
      setImgStyle(imgStyle + imgWidth);
    }
  };

  const renderView = () => {
    // console.log(bookclubDetails)
    if (!user) {
      return (
        <div className="club-of-the-day">
          <div className="club-left" style={clubImg} />
          <div className="club-right">
            <h1>CLUB OF THE DAY</h1>
            <h3>{bookClub.bookclubName}</h3>
            <h5>{bookClub.membersCount} Members</h5>
            <p>{bookClub.description}</p>
            <div className="join green-btn">
              <button type="button" onClick={handleUserLogin}>
                LOG IN
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{position:'relative'}}>
        <div className="club-btns">
          <div className="prev">
            <button onClick={handlePrev} type="button">
              <ArrowBackIosIcon />
            </button>
          </div>
          <div className="next">
            <button onClick={handleNext} type="button">
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
        <div className="my-book-clubs-container" ref={ref}>
          <div className="my-book-clubs" style={{ transform: `translate(${imgStyle}px)` }}>
            {myBookClubs.map((club) => (
              <Carousel width={measureWidth} club={club} key={club.bookclubInfo.bookclubName} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const hasQuery = ({ bookclubInfo }) => {
    const { bookclubName, description } = bookclubInfo;

    const queryRE = new RegExp(searchQuery, 'i');

    return queryRE.test(bookclubName) || queryRE.test(description);
  };

  useEffect(() => {
    setRenderedClubs(() => {
      if (!searchQuery)
        return allClubs.map((club) => <AllClubs club={club} user={user} key={Math.random()} />);

      return allClubs.reduce(
        (renderList, club) =>
          hasQuery(club)
            ? [...renderList, <AllClubs club={club} user={user} key={Math.random()} />]
            : renderList,
        [],
      );
    });
  }, [searchQuery, allClubs]);

  useEffect(() => {
    // setBookClub(PopularBookclubs.results[0].bookclubInfo);
    // setAllClubs(PopularBookclubs.results);
    // setMyBookClubs(PersonalBookClubs);


    setBookClub(PopularBookclubs.results[0].bookclubInfo);
    setAllClubs(PopularBookclubs.results);
    setMyBookClubs(PersonalBookClubs);
  }, [user]);

  return (
    <div className="book-clubs">
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <div>
              <h1>BOOK CLUBS</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div style={{ width: '100%' }}>
          <div className="club-search-bar">
            <div className="the-first-two-thirds" />
            <div className="club-search">
              <SearchBar filterOptions={filterOptions} />
            </div>
          </div>
          {renderView()}
        </div>
        <div className="allClubs">{renderedClubs}</div>
      </div>
    </div>
  );
}
