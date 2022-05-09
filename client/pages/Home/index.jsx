import React, { useState } from 'react';
import '../styles/Home.css';
import Trends from './Trends';
import BookClubs from './BookClubs';
import SearchBar from '../../../components/SearchBar';

export default function Home() {
  const [trends, setTrends] = useState([1, 2, 3, 4]);
  const [bookClubs, setBookClubs] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  return (
    <div className="Home">
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="description">
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor diam vitae
            interdum molestie. In placerat suscipit velit, gravida pretium velit maximus id. Duis ut
            felis maximus, suscipit orci vitae, porta metus.{' '}
          </p>
        </div>
      </div>

      <div className="trends">
        <h1>TRENDS</h1>
        <p>Simple is Better.</p>
        <div className="trends-list">
          {trends.map((book) => (
            <Trends book={book} key={book} />
          ))}
        </div>
      </div>

      <div className="featured-clubs">
        <div className="left">
          <div>
            <h3>FEATURED</h3>
            <h1>BOOK CLUBS</h1>
          </div>
        </div>
        <div className="right">
          <div className="clubs-list">
            {bookClubs.map((club) => <BookClubs club={club} key={club} />)}
            <div className="clear" />
          </div>
        </div>
      </div>

      <div className="surprise">
        <h1>SURPRISE ME!</h1>
        <div className="card">
          <div className="imgBox">
            <div className="bark" />
            <img src="../assets/logo.png" alt="BookFace Logo" />
          </div>
          <div className="details">
            <h4 className="color1">READ KATY&apos;S NOTION OR GO BACK TO SCHOOL!!!</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
