import React, { useState, useEffect } from 'react';
import AllClubs from './AllClubs';
import PopularBookclubs from '../../../fakedata/bookClubs/popularBookclubs'

export default function BookClubs() {

  const [bookClub, setBookClub] = useState([])
  const [allClubs, setAllClubs] = useState([])


  useEffect(() => {
    setBookClub(PopularBookclubs.results[0].bookclubInfo);
    setAllClubs(PopularBookclubs.results)
  }, [])

  const style = {
    'background': 'url(../assets/header-bg.jpg) no-repeat center center fixed'
  }

  const clubImg = { background: `url('${bookClub.imageUrl}') no-repeat center center` }

  return (
    <div className='book-clubs'>
      <div className='header-container'>
        <div className='header' style={style}>
          <div className='filter'></div>
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

          <div className='club-of-the-day'>
            <div className='club-left' style={clubImg}>
            </div>
            <div className='club-right'>
              <h1>CLUB OF THE DAY</h1>
              <h3>{bookClub.bookclubName}</h3>
              <h5>{bookClub.membersCount} Members</h5>
              <p>{bookClub.description}</p>
              <div className='join green-btn'>
                <button type='button'>JOIN</button>
              </div>
            </div>
          </div>


        </div>
        <div className='allClubs'>
          {
            allClubs.map((club, index) => {
              return <AllClubs club={club} key={index} />
            })
          }
        </div>
      </div>
    </div>
  );
}
