import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import SideBar from './sidebar';
import Carousel from './carousel';
import ReadingGoals from './readingGoals';
import useStore from '../../userStore';
import '../styles/MyBooks.css';
import '../styles/BookClubDetails.css';

export default function MyBooks() {

  const { user, setUser, setToken } = useStore();
  const [allBooks, setAllBooks] = useState([]);
  const [bookclubs, setBookclubs] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  const [currentView, setCurrentView] = useState('All');

  const handleClick = (event) => {
    setCurrentView(event.target.innerText);
  }

  //NOTE: get bookshelves by userId is working
  const getBookshelves = (uid) => {
    axios.get('http://localhost:3030/bookshelves', { params: {userId: 1}})
      .then(({data}) => {
        const temp = [];
        for(let i = 0; i < data.results.length; i += 1) {
          temp.push(data.results[i].title);
        }
        setBookshelves(temp);
      })
      .catch(err => {
        console.error(err);
      })
  }

  //NOTE: get bookclubs by userId is working
  const getBookclubs = (uid) => {
    axios.get('http://localhost:3030/myBookclubs', { params: {userId: "qwew"}})
    .then(({data}) => {
      // console.log('bookclubs', data);
      const temp = [];
      for(let i = 0; i < data.results.length; i += 1) {
        temp.push(data.results[i].bookclubInfo.bookclubName);
      }
      setBookclubs(temp);
    })
    .catch(err => {
      console.log(err);
    })
  }

  //NOTE: get books by userId is working
  //Default data for the book gallery
  const getBooks = (uid) => {
  axios.get('http://localhost:3030/books', { params: {userId: 1}})
    .then(({data}) => {
      // console.log('books', data);
      // const container = [];
      // for(let i = 0; i < data.results.length; i += 1) {
      //   const temp = {};
      //   temp.bookshelf = data.results[i].bookshelf;
      //   temp.img = data.results[i].imageLinks.smallThumbnail;
      //   container.push(temp);
      // }
      setAllBooks(data.results);
    })
    .catch(err => {
      console.log(err);
    })
  }



  useEffect(() => {
    getBookshelves();
    getBooks();
    getBookclubs();
  },[])

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  return (
    <div>
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter"></div>
          <div className="main-content">
            <div>
              <div className="mybooks">
                <h1>
                  My Books
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="banner">
          <p>Description</p>
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
              <div className='my-bookshelves'>
                <h2>My Bookshelves</h2>
                  <p value={'All'} onClick={handleClick}>All</p>
                  {bookshelves.map(shelf => (
                    <p
                      key={Math.random()}
                      value={shelf}
                      onClick={handleClick}
                    >
                      {shelf}
                    </p>
                  ))}
              </div>

              <div className='my-book-clubs'>

                <h2>My Book Clubs</h2>
                  {bookclubs.map(club => (
                    <div key={club}>
                      <Link to='/bookclubdetail'>
                        {club}
                      </Link>
                    </div>
                  ))}
              </div>
              <div className='reading-goal'>
                <h2>Reading Goals</h2>
                  <ReadingGoals />
              </div>
            </div>

            {/* NOTE: Bookshelves get rendered here */}
            <div className='content-right'>
              <Carousel
                selectedBookshelf={currentView}
                allBooks={allBooks}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

