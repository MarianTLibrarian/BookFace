import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import SideBar from './sidebar';
import Carousel from './carousel';
import ReadingGoals from './readingGoals';
import SearchBar from '../../../components/SearchBar';
import useStore from '../../userStore';
import '../styles/MyBooks.css';
import '../styles/BookClubDetails.css';

const filterOptions = { books: 'Books', myBooks: 'My Books' };

export default function MyBooks() {
  // calculate the % of books read
  const percentageRead = 72;

  const { user, setUser, setToken, expressUrl, searchQuery } = useStore();

  // sources of truth
  const [allBooks, setAllBooks] = useState([]);
  const [bookclubs, setBookclubs] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);

  // filtered by search
  const [renderedBooks, setRenderedBooks] = useState([]);
  // TODO: these get rendered out to the page
  const [renderedClubs, setRenderedClubs] = useState([]);
  const [renderedShelves, setRenderedShelves] = useState([]);
  const [currentView, setCurrentView] = useState('All');

  const handleClick = (event) => {
    setCurrentView(event.target.innerText);
  };

  // NOTE: get bookshelves by userId is working
  const getBookshelves = (uid) => {
    axios
      .get(`${expressUrl}/bookshelves`, { params: { userId: uid } })
      .then(({ data }) => {
        const temp = [];
        for (let i = 0; i < data.results.length; i += 1) {
          temp.push(data.results[i].title);
        }
        setBookshelves(temp);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // NOTE: get bookclubs by userId is working
  const getBookclubs = (uid) => {
    axios
      .get(`${expressUrl}/myBookclubs`, { params: { userId: uid } })
      .then(({ data }) => {
        // console.log('bookclubs', data);
        const temp = [];
        for (let i = 0; i < data.results.length; i += 1) {
          temp.push(data.results[i].bookclubInfo.bookclubName);
        }
        setBookclubs(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NOTE: get books by userId is working
  // Default data for the book gallery
  const getBooks = (uid) => {
    axios
      .get(`${expressUrl}/books`, { params: { userId: uid } })
      .then(({ data }) => {
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
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // FIXME: these are placeholder arguments
    getBookshelves(1);
    getBooks(1);
    getBookclubs('qwew');
  }, []);

  useEffect(() => {
    setRenderedBooks(() => {
      if (!searchQuery) return allBooks;

      const queryRE = new RegExp(searchQuery, 'i');
      const hasQuery = ({ title, description }) => queryRE.test(title) || queryRE.test(description);

      return allBooks.filter((book) => hasQuery(book));
    });
  }, [allBooks]);

  useEffect(() => {
    setRenderedClubs(() => {
      if (!searchQuery) return bookclubs;

      const queryRE = new RegExp(searchQuery, 'i');
      const hasQuery = (clubName) => queryRE.test(clubName);

      return bookclubs.filter((club) => hasQuery(club));
    });
  }, [bookclubs]);

  useEffect(() => {
    setRenderedShelves(() => {
      if (!searchQuery) return bookshelves;

      const queryRE = new RegExp(searchQuery, 'i');
      const hasQuery = (shelfName) => queryRE.test(shelfName);

      return bookshelves.filter((shelf) => hasQuery(shelf));
    });
  }, [bookshelves]);

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center fixed',
  };

  return (
    <div>
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <div>
              <div className="mybooks">
                <h1>My Books</h1>
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
      <div className="page-content">
        <div style={{ width: '100%' }}>
          <div className="books-search-bar">
            <div className="the-first-two-thirds" />
            <div className="books-search">
              <SearchBar filterOptions={filterOptions} />
            </div>
          </div>

          <div className="content-container">
            <div className="content-left">
              <div className="my-bookshelves">
                <h2>My Bookshelves</h2>
                <p value={'All'} onClick={handleClick}>
                  All
                </p>
                {bookshelves.map((shelf) => (
                  <p key={Math.random()} value={shelf} onClick={handleClick}>
                    {shelf}
                  </p>
                ))}
              </div>

              <div className="my-book-clubs">
                <h2>My Book Clubs</h2>
                <Link to="/bookclubs" style={{ textDecoration: 'none', color: 'black' }}>
                  <p>All Clubs</p>
                </Link>
                {bookclubs.map((club) => (
                  <div key={club}>
                    <Link to="/bookclubdetail" style={{ textDecoration: 'none', color: 'black' }}>
                      {club}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="reading-goal">
                <Link to="/stats" style={{ textDecoration: 'none', color: 'black' }}>
                  <h2
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    Reading Goals
                    <span style={{ fontSize: '12px', paddingRight: '1em' }}>&#9658;</span>
                  </h2>
                </Link>
                <ReadingGoals
                  className="reading-goal"
                  strokeColor="var(--sunset)"
                  strokeWidth="5"
                  innerText="READ"
                  percentage={percentageRead}
                  trailStrokeWidth="5"
                  trailStrokeColor="var(--dark-beige)"
                  trailSpaced="true"
                  speed="10"
                />
              </div>
            </div>

            {/* NOTE: Bookshelves get rendered here */}
            <div className="contentRight">
              <Carousel selectedBookshelf={currentView} allBooks={renderedBooks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
