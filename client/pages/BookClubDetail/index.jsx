import React, { useState, useEffect } from 'react';
import MyBookClubs from './MyBookClubs';
import Posts from './Posts';
import PopularBookclubs from '../../../fakedata/bookClubs/popularBookclubs';
import '../styles/BookClubDetails.css';
import SendIcon from '@mui/icons-material/Send';

export default function BookClubDetail() {

  const [myClub, setMyClub] = useState(PopularBookclubs.results);

  useEffect(() => {

  }, [])

  const style = {
    background: `url('${myClub[0].bookclubInfo.imageUrl}') no-repeat center center fixed`
  }

  console.log(myClub)

  return (
    <div className='book-club-detail'>
      <div className='header-container'>
        <div className='header' style={style}>
          <div className='filter'></div>
          <div className='main-content'>
            <div>
              <h1>{myClub[0].bookclubInfo.bookclubName}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <div className="text">
          <p>
            {myClub[0].bookclubInfo.description}
          </p>
        </div>
      </div>

      <div className='page-content'>
        <div style={{ 'width': '100%' }}>
          <div className='search-bar'>
            <div className='search'>
              <input />
            </div>
          </div>

          <div className='content-container'>
            <div className='content-left'>
              <div className='my-clubs'>
                <h2>My Book Clubs</h2>
                {myClub.map(club =>
                  <MyBookClubs club={club} key={club} />
                )}
              </div>
              <div className='upcoming-events'>
                <h2>Upcoming Events</h2>
              </div>
              <div className='calendar'>
                <h2>Calendar</h2>
              </div>
              <div className='create-events'>
                <button type='button'>CREATE AN EVENT</button>
              </div>
            </div>
            <div className='content-right'>
              <div className='write-post'>

                <textarea placeHolder='Leave A Comment...' />
                <div className='submit'>
                  <div className='submit-btn'>
                  <SendIcon />
                  </div>
                </div>
              </div>
              <div className='club-posts'>
                {myClub[0].posts.map(post =>
                  <Posts post={post} key={post} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
