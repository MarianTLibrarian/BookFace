import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import SearchBar from '../../../components/SearchBar';
import Trends from './Trends';
import BookClubs from './BookClubs';
import useStore from '../../userStore';

export default function Home() {

  const { bookclubDetails, bookDetails} = useStore();

  const setPopularBookclubs = useStore(state => state.setPopularBookclubs);
  const popularBookclubs = useStore(state => state.popularBookclubs);

  const [fiction, setFictionTrends] = useState([]);
  const [nonFiction, setNonfictionTrends] = useState([]);
  const [bookClubs, setBookClubs] = useState([])
  const [surpriseData, setSurpriseData] = useState([]);
  const [surpriseBook, setSurpriseBook] = useState([]);


  // const surpriseSelector = (array) => {
  //   const isbnArray = [];
  //   array.forEach(item => {
  //     isbnArray.push(item.volumeInfo.industryIdentifiers[0].identifier)
  //   })
  //   console.log(isbnArray);
  // }


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
        setPopularBookclubs(data);
        const featuredClubs = data.slice(0, 8);
        setBookClubs(featuredClubs);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getSurprise = (q) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)//what id used to reference book?  "9781483458427"
    .then(({ data }) => {
      const temp = data.items
      setSurpriseData(temp)
  })
    .catch(err => {
      console.error(err);
    })
  }

    useEffect(() => {
      getTrendingBooks();
      getTrendingBookclubs();
      getSurprise();
  }, [])

    useEffect(() => {
      setSurpriseBook(surpriseData[Math.floor(Math.random() * surpriseData.length)])
    }, [surpriseData])

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  const renderView = () => {
    if (surpriseBook) {
      return(
        <div>
            <div className="surprise">
            <h1>SURPRISE ME!</h1>
            <div className="card">
              <div className="imgBox">
                <div className="bark" />
                <img src={surpriseBook.volumeInfo?.imageLinks.smallThumbnail || "http://books.google.com/books/content?id=u1-hDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"} alt="Book Cover" />
              </div>
              <div className="details">
                <h4 className="surprise-title">Title: {surpriseBook.volumeInfo?.title || 'Title'}</h4>
                <h4 className="surprise-author">Author: {surpriseBook.volumeInfo?.authors || 'Author'}</h4>
                <button className="surprise-button" type="button">Details</button>
              </div>
            </div>
          </div>
        </div>
          )
        }
      return null;
    }

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
        <h2 style={{ textAlign: 'left' }}>Fiction: </h2>
        <div className="trends-list">
          {fiction.map((book) => (
            <Trends book={book} key={book} />
          ))}
        </div>
        <h2 style={{ textAlign: 'left' }}>Non-Fiction: </h2>
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
              <Link to='/bookclubdetail' >
                <BookClubs club={club} key={Math.random()}/>
              </Link>
            ))}
            <div className="clear" />
          </div>
        </div>
      </div>
      {renderView()}
    </div>
  );
}
