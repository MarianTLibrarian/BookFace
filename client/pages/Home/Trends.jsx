import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useStore from '../../userStore';
const googleBooksAPIUrl = 'https://www.googleapis.com/books/v1/volumes';

export default function Trends({ book }) {
  const { bookDetails, setBookDetails } = useStore();


  const handleBookClick = () => {
    const isbn = book.isbn13;
    const url = `${googleBooksAPIUrl}?q=${isbn}`;

    axios.get(url)
    .then((res)=>{
      const fullbookdetail = res.data.items[0].volumeInfo;
      // console.log("res.data.items[0]",res.data.items[0]);
      const bookdetail = {
        isbn: book.isbn13,
        title: fullbookdetail.title,
        authors: fullbookdetail.authors,
        publisher: fullbookdetail.publisher,
        publishedDate: fullbookdetail.publishedDate,
        description: fullbookdetail.description,
        categories: fullbookdetail.categories,
        imageLinks: fullbookdetail.imageLinks,
        language: fullbookdetail.language
      };

      // console.log('bookkdetail', bookdetail);

      setBookDetails(bookdetail);

    })
    .catch(err=> console.log(err));



  }

  return (
    <div className="trends-book" onClick={handleBookClick} >
      <Link to='/bookdetail'>
        <img src={book.book_image} alt="bookcover" />
      </Link>
    </div>

  );
}


