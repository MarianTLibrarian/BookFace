import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from './carousel';
import ReadingStatsWidget from './ReadingStatsWidget';
import SearchBar from '../../../components/SearchBar';
import useStore from '../../userStore';
import '../styles/MyBooks.css';
import '../styles/BookClubDetails.css';


const filterOptions = { books: 'Books', myBooks: 'My Books' };

export default function MyBooks() {
  // calculate the % of books read
  const percentageRead = 72;

  const setBookclubDetails = useStore(state => state.setBookclubDetails);
  const bookclubDetails = useStore(state => state.bookclubDetails);
  const { user, setUser, setToken, expressUrl, searchQuery } = useStore();

const setBookclubName = useStore(state => state.setBookclubName);
const bookclubName = useStore(state => state.bookclubName);


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
    event.preventDefault();
    setCurrentView(event.target.innerText);
  };

  const handleClubClick = (currentClub) => {
    setBookclubName(currentClub);
  }

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
        console.log('setBookclubDetails', data.results);

        setBookclubDetails(data.results)

        const temp = [];
        for (let i = 0; i < data.results.length; i += 1) {
          temp.push(data.results[i].bookclubInfo.bookclubName);
        }

        setBookclubs(temp);

        // console.log("setUsersBookclubs",temp )
        // setUsersBookclubs(temp)
        // console.log(setUsersBookclubs.toString())
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
        const container = [];
        for(let i = 0; i < data.results.length; i += 1) {
          const temp = {};
          temp.bookshelf = data.results[i].bookshelf;
          temp.img = data.results[i].imageLinks.smallThumbnail;
          container.push(temp);
        }
        setAllBooks(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // FIXME: these are placeholder arguments
    getBookshelves(user.uid);
    getBooks(user.uid);
    getBookclubs(user.uid);
  }, []);

  useEffect(() => {
    setRenderedBooks(() => {
      if (!searchQuery) return allBooks;

      const queryRE = new RegExp(searchQuery, 'i');
      const hasQuery = ({ title, description }) => queryRE.test(title) || queryRE.test(description);

      const booksToRender = allBooks.filter((book) => hasQuery(book));

      console.log({searchQuery, booksToRender})
      return booksToRender;
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
          <p>View and Manage Bookshelves, Book Clubs, and Reading Goals</p>
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
                  <p className="shelf-listing" key={Math.random()} value={shelf}
                  onClick={handleClick}>
                    {shelf}
                  </p>
                ))}
              </div>

              <div className="my-book-clubs">
                <h2>My Book Clubs</h2>
                <p>All Clubs</p>
                {/* <Link to="/bookclubs" style={{ textDecoration: 'none', color: 'black' }}>
                </Link> */}
                {bookclubs.map((club) => (
                  <div className="club-listing" key={club}>
                    <Link onClick={() => handleClubClick(club)} to="/bookclubdetail" style={{ textDecoration: 'none', color: 'black' }}>
                      {club}
                    </Link>
                  </div>
                ))}
              </div>

              <div className='reading-goal'>
                <Link to='/stats' style={{'text-decoration': 'none', 'color': 'black'}}>
                  <h2 style={{
                    'display': 'flex',
                    'flex-direction': 'row',
                    'align-items': 'center',
                    'justify-content': 'space-between'
                  }}>
                    Reading Stats
                    <span
                      style={{'font-size': '12px', 'padding-right': '1em'}}
                    >&#9658;</span>
                  </h2>
                </Link>
                <div style={{'border': '1px solid transparent'}}>
                  <ReadingStatsWidget />
                </div>
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
