import React, { useState, useEffect } from 'react';
import '../styles/MyBooks.css';

export default function Carousel({ selectedBookshelf, allBooks }) {
  const [currentBookshelf, setCurrentBookshelf] = useState([]);
console.log('selectedBookshelf', selectedBookshelf);
  console.log('allbooks', allBooks);
  console.log('currentBookshelf', currentBookshelf);

  useEffect(()=> {
    if (selectedBookshelf === 'All') {
      setCurrentBookshelf(allBooks);
      console.log('uecbs', currentBookshelf)
    } else {
      setCurrentBookshelf(allBooks.filter(book => (
        book.bookshelf === selectedBookshelf
        )))
      }
    },[selectedBookshelf]);

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
            <div className="book-cover" style={{'background': `url('${book.imageLinks.smallThumbnail}')`}}>
              <div className="effect"></div>
              <div className="light"></div>
            </div>
            <div className="book-inside">
            </div>
            <a className="btn" href="#">£19.95</a>
          </div>
        ))}

      </div>
    </div>
  )
}
