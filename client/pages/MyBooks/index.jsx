import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import SideBar from './sidebar';
import Carousel from './carousel';
import ReadingGoals from './readingGoals';
import useStore from '../../userStore';
<<<<<<< HEAD




export default function MyBooks() {

  const [books, setBooks] = useState([]);
  const [currentView, setCurrentView] = useState('');
  const { user, setUser, setToken } = useStore();

  const handleClick = (event) => {
    setCurrentView(event.target.innerText);


  }


  // const uniqueBookshelves = [];
  // function removeDuplicates(arr) {
  //   arr.forEach(element => {
  //       if (!uniqueBookshelves.includes(element)) {
  //           uniqueBookshelves.push(element);
  //       }
  //   });
  //   return uniqueBookshelves;
  // }
  // removeDuplicates(bookshelves);
=======
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

>>>>>>> main


  // const getBookshelves = (uid) => {
  //   axios.get('/bookshelves', { params: {userId: 1}})
  //     .then(({data}) => {
  //       console.log('THIS', data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  const getBookshelves = (userId) => {
    axios({
      method: 'get',
      url: 'localhost:3030/bookshelves',
      params: { userId: '1' }
    })
    .then(({ data }) => {
      console.log('HERE!!!', data)
    })
    .catch((err) => {
      console.log('error on client side')
    });
  }

  useEffect(() => {
    getBookshelves();
<<<<<<< HEAD
  })
=======
    getBooks();
    getBookclubs();
  },[])
>>>>>>> main

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
<<<<<<< HEAD
              {/* <div className='my-bookshelves'>
                <h2>My Bookshelves</h2>
                  {uniqueBookshelves.map(shelf => (
                    <p
=======
              <div className='my-bookshelves'>
                <h2>My Bookshelves</h2>
                  <p value={'All'} onClick={handleClick}>All</p>
                  {bookshelves.map(shelf => (
                    <p
                      key={Math.random()}
>>>>>>> main
                      value={shelf}
                      onClick={handleClick}
                    >
                      {shelf}
                    </p>
                  ))}
<<<<<<< HEAD
              </div> */}

              <div className='my-book-clubs'>
                {/* To Do: dynamically render book clubs */}
                <h2>My Book Clubs</h2>
                  <p>All</p>
                  <p>Read</p>
                  <p>Currently Reading</p>
                  <p>Want To Read</p>
                  {/* <SideBar /> */}
              </div>
              <div className='reading-goal'>
                <h2>Reading Goals</h2>
                  <ReadingGoals />
              </div>
=======
              </div>

              <div className='my-book-clubs'>

                <h2>My Book Clubs</h2>
                  {bookclubs.map(club => (
                    <div key={club}>
                      <Link to='/bookclubdetail' style={{'text-decoration': 'none', 'color': 'black'}}>
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
                    Reading Goals
                    <span
                      style={{'font-size': '12px', 'padding-right': '1em'}}
                    >&#9658;</span>
                  </h2>
                </Link>
                  <ReadingGoals />
              </div>

>>>>>>> main
            </div>

            {/* NOTE: Bookshelves get rendered here */}
            <div className='content-right'>
<<<<<<< HEAD
              <Carousel books={books}/>
              HEREEE
=======
              <Carousel
                selectedBookshelf={currentView}
                allBooks={allBooks}
              />
>>>>>>> main
            </div>

          </div>
        </div>
      </div>
    </div>
  )
<<<<<<< HEAD

=======
>>>>>>> main
}

