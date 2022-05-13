import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import SearchBar from '../../../components/SearchBar';
import Trends from './Trends';
import BookClubs from './BookClubs';
import useStore from '../../userStore';

export default function Home() {

  const {user, setPopularBookclubs,setBookclubDetails, setUsersBookclubs} = useStore();
  // const setUsersBookclubs = useStore(state => state.setUsersBookclubs);



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
      .then(({ data }) => {

        setBookclubDetails(data);
        setPopularBookclubs(data);

        const featuredClubs = data.slice(0, 8);
        setBookClubs(featuredClubs);
      })
      .catch(err => {
        console.error(err);
      })
  }

    const getMybookclubs = (uid) => {
      axios
        .get('http://localhost:3030/myBookclubs', { params: { userId: uid } })
        .then(({ data }) => {
          const temp = [];
          for (let i = 0; i < data.results.length; i += 1) {
            temp.push(data.results[i].bookclubInfo.bookclubName);
          }

          setUsersBookclubs(temp)

        })
        .catch((err) => {
          console.log(err);
        });
    };


  useEffect(() => {
    getTrendingBooks();
    getTrendingBookclubs();
    if(user) {
      getMybookclubs(user.uid)
    }

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
              <div className="home-headline">
                <h1>Home for Your Tome</h1>
              </div>
              <div />
              <SearchBar />
              <div />
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="text">
          <p>Find and read more books you'll love, and keep track of the books you want to read.</p>
          <p>Be part of the world's largest community of book lovers on BookFace.</p>
        </div>
      </div>

      <div className="trends">
        <h1>EXPLORE TRENDS</h1>

        <div className="trends-list">
          {fiction.map((book) => (
            <Trends book={book} key={Math.random()} />
          ))}
        </div>
        <div className='bookshelf'>
          <img src='../../../assets/shelf_wood.png' alt='shelf'/>
        </div>

        <div className="trends-list">
          {nonFiction.map((book) => (
            <Trends book={book} key={Math.random()} />
          ))}
        </div>
        <div className='bookshelf'>
        <img src='../../../assets/shelf_wood.png' alt='shelf'/>
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
              <Link to='/bookclubdetail' >
                <BookClubs club={club} key={Math.random()}/>
              </Link>
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
