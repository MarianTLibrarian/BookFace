import React, { useState, useEffect } from 'react';
import AllClubs from './AllClubs';
import PopularBookclubs from '../../../fakeData/bookClubs/popularBookclubs';
import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';
import ClubCarousel from './ClubCarousel';
import SearchBar from '../../../components/SearchBar';
import '../styles/BookClubs.css';

const filterOptions = { clubs: 'Clubs', myClubs: 'My Clubs' };

export default function BookClubs() {
  const [bookClub, setBookClub] = useState([]);
  const [allClubs, setAllClubs] = useState([]);
  const { user, setUser, setToken, searchQuery } = useStore();

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

  const renderView = () => {
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
      return <div className='most-visited-clubs'>LOGGED IN</div>
  }

  const hasQuery = ({ bookclubInfo }) => {
    const { bookclubName, description } = bookclubInfo;

    console.log({ bookclubName });
    console.log({ description });

    const queryRE = new RegExp(searchQuery, 'i');

    return queryRE.test(bookclubName) || queryRE.test(description);
  };

  const renderClubs = () =>
    searchQuery
      ? allClubs.reduce(
          (renderList, club) =>
            hasQuery(club) &&
            renderList.push(<AllClubs club={club} user={user} key={club.bookclubId} />),
          [],
        )
      : allClubs.map((club) => <AllClubs club={club} user={user} key={club.bookclubId} />);

  useEffect(() => {
    setBookClub(PopularBookclubs.results[0].bookclubInfo);
    setAllClubs(PopularBookclubs.results);
    renderView(); // TODO: wait. why is this here?
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
        <div className="allClubs">
          {renderClubs()}
        </div>
      </div>
    </div>
  );
}
