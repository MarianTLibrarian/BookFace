import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyBooks.css';
import useStore from '../../userStore'

export default function Carousel({ selectedBookshelf, allBooks }) {
  const [currentBookshelf, setCurrentBookshelf] = useState([]);
  const setBookDetails = useStore(state => state.setBookDetails);
  const bookDetails = useStore(state => state.bookDetails)

  const handleClick = (currentBook) => {
    setBookDetails(currentBook)
  }

  useEffect(() => {
    if (selectedBookshelf === 'All') {
      setCurrentBookshelf(allBooks);
    } else {
      setCurrentBookshelf(allBooks.filter(book => (
        book.bookshelf === selectedBookshelf
      )))
    }
  }, [selectedBookshelf, allBooks]);

  // setBookDetail function click event to bookcover div<<
  return (
    <div className="carousel">
      <h3>Books</h3>
      <div className="container">
        {currentBookshelf.map(book => (
          <div className="book" key={Math.random()}>
            <div className="title">
              <p>{book.title}</p>
            </div>
            <Link to="/bookdetail">
              <div
                className="book-cover"
                style={{ 'background': `url('${book.imageLinks.smallThumbnail}')` }}
                onClick={() => handleClick(book)}
              >
                <div className="effect"></div>
                <div className="light" ></div>
              </div>
            </Link>

            <div className="book-inside">
            </div>
            <a className="btn" href="#">£19.95</a>
          </div>
        ))}
      </div>
    </div>
  )
}
