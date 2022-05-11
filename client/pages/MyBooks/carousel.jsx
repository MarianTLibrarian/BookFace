import React, { useState, useEffect } from 'react';
import '../styles/MyBooks.css';

export default function Carousel({ selectedBookshelf, allBooks }) {
  const [currentBookshelf, setCurrentBookshelf] = useState([]);


  useEffect(()=>{
    if (selectedBookshelf === 'All') {
      setCurrentBookshelf(allBooks);
    } else {
      setCurrentBookshelf(allBooks.filter(book => (
        book.bookshelf === selectedBookshelf
      )))
    }
  },[selectedBookshelf]);

<<<<<<< HEAD
=======
  // const shelfView = () => {
  //   switch (selectedBookshelf) {
  //     case 'BOOKS':
  //       return <BooksStats />;
  //     case 'PAGES':
  //       return <PagesStats />;
  //     case 'GENRES':
  //       return <GenresStats />;
  //     default:
  //       return <BooksStats />;
  //   }
  // }

>>>>>>> main
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
