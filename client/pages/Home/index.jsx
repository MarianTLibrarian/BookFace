import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Trends from './Trends';
import BookClubs from './BookClubs';

export default function Home() {

  const [trends, setTrends] = useState([1, 2, 3, 4])
  const [bookClubs, setBookClubs] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  const style = {
    'background': 'url(../assets/header-bg.jpg) no-repeat center center fixed'
  }

  return (
    <div className='Home'>
      <div className='header-container'>
        <div className='header' style={style}>
          <div className='filter'></div>
          <div className='main-content'>
            <div>
              <h1>BOOKFACE</h1>
              <h3>A Home For Your Tome</h3>
              <div className='search'>
                <input placeHolder='Enter A Book Name' />
              </div>
              <button type='button'>SEARCH</button></div>
          </div>
        </div>
      </div>
      <div className='description'>
        <div className='text'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor diam vitae interdum molestie. In placerat suscipit velit, gravida pretium velit maximus id. Duis ut felis maximus, suscipit orci vitae, porta metus. </p>
        </div>
      </div>

      <div className='trends'>
        <h1>TRENDS</h1>
        <p>Simple is Better.</p>
        <div className='trends-list'>
          {trends.map((book, index) => {
            return <Trends book={book} key={index} />
          })}
        </div>
      </div>

      <div className='featured-clubs'>
        <div className='left'>
          <div>
            <h3>FEATURED</h3>
            <h1>BOOK CLUBS</h1>
          </div>
        </div>
        <div className='right'>
          <div className='clubs-list'>
            {bookClubs.map((club, index) => {
              return <BookClubs club={club} key={index} />
            })}
            <div className='clear'></div>
          </div>
        </div>
      </div>

      <div className='surprise'>
        <h1>SURPRISE ME!</h1>
        <div class="card">
          <div class="imgBox">
            <div class="bark"></div>
            <img src="../assets/logo.png" />
          </div>
          <div class="details">
            <h4 class="color1">READ KATY'S NOTION OR GO BACK TO SCHOOL!!!</h4>

          </div>
        </div>
      </div>
    </div>
  );
}
