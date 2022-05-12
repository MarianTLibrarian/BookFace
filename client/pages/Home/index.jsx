import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import SearchBar from '../../../components/SearchBar';
import Trends from './Trends';
import BookClubs from './BookClubs';

export default function Home() {

  const [fiction, setFictionTrends] = useState([]);
  const [nonFiction, setNonfictionTrends] = useState([]);
  const [bookClubs, setBookClubs] = useState([])


  const getTrendingBooks = () => {
    axios.get('http://localhost:3030/popularBooks')
      .then(({data}) => {
        setFictionTrends(data.lists[0].books);
        setNonfictionTrends(data.lists[1].books);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getTrendingBookclubs = () => {
    axios.get('http://localhost:3030/bookclubs')
      .then(({data}) => {
        const featuredClubs = data.slice(0, 8)
        setBookClubs(featuredClubs)
      })
      .catch(err => {
        console.error(err);
      })
  }


  useEffect(() => {
    getTrendingBooks();
    getTrendingBookclubs()
  }, [])

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  return (
    <div className="Home">
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <div className="home-search-bar">
              <div />
              <SearchBar />
              <div />
            </div>
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
        <h1>Explore Trends</h1>
        <p>What will you discover?</p>
        <h2 style={{textAlign: 'left'}}>Fiction: </h2>
        <div className="trends-list">
          {fiction.map((book) => (
            <Trends book={book} key={book} />
          ))}
        </div>
        <h2 style={{textAlign: 'left'}}>Non-Fiction: </h2>
        <div className="trends-list">
          {nonFiction.map((book) => (
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
            {bookClubs.map((club) => (
              <BookClubs club={club} key={Math.random()} />
            ))}
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
