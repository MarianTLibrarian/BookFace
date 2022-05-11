import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import Carousel from './carousel';
import ReadingGoals from './readingGoals';
import useStore from '../../userStore';


export default function MyBooks() {

  // calculate the % of books read
  let percentageRead = 72;

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

  // const getBooks = function() {
  //   axios.get('/books')
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

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
      url: 'https://localhost:3030/bookshelves',
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
  })

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
              {/* <div className='my-bookshelves'>
                <h2>My Bookshelves</h2>
                  {uniqueBookshelves.map(shelf => (
                    <p
                      value={shelf}
                      onClick={handleClick}
                    >
                      {shelf}
                    </p>
                  ))}
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
                  <ReadingGoals
                    className="reading-goal"
                    strokeColor="var(--sunset)"
                    strokeWidth="5"
                    innerText="READ"
                    percentage={percentageRead}
                    trailStrokeWidth="5"
                    trailStrokeColor="var(--dark-beige)"
                    trailSpaced='true'
                    speed='10'
                  />
              </div>
            </div>

            {/* NOTE: Bookshelves get rendered here */}
            <div className='content-right'>
              <Carousel books={books}/>
              HEREEE
            </div>

          </div>
        </div>
      </div>
    </div>
  )

}

