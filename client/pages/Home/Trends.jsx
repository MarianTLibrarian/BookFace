import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useStore from '../../userStore';
const googleBooksAPIUrl = 'https://www.googleapis.com/books/v1/volumes';

export default function Trends({ book }) {
  const { bookDetails, setBookDetails } = useStore();
  const [bookImage, setBookImage] = React.useState('../../../assets/testBook.jpg');

  React.useEffect(() => {
<<<<<<< HEAD
    // console.log({ imgs: book.imageLinks });

=======
>>>>>>> main
    // Why does the database have a different structure? (T_T)
    if (Object.hasOwnProperty.call(book, 'book_image')) {
      setBookImage(book.book_image);
    } else if (Object.hasOwnProperty.call(book, 'imageLinks')) {
      setBookImage(book.imageLinks.thumbnail || book.imageLinks.smallThumbnail);
    } else {
      setBookImage('../../../assets/testBook.jpg');
    }
  }, [book]);

  const handleBookClick = () => {
    const isbn = book.isbn13;
    const url = `${googleBooksAPIUrl}?q=${isbn}`;

    axios
      .get(url)
      .then((res) => {
        const fullbookdetail = res.data.items[0].volumeInfo;
        // console.log("res.data.items[0]",res.data.items[0]);
        const bookdetail = {
          ...fullbookdetail,
          isbn: book.isbn13,
        };

        // console.log('bookkdetail', bookdetail);

        setBookDetails(bookdetail);
      })
      .catch((err) => console.log(err));
  };

  const cover = {
    background: `url('${bookImage}') no-repeat center center`,
  }

  return (
    <div className="trends-book" onClick={handleBookClick}>
      <Link to="/bookdetail">
        <div className="book">
          <div className="book-cover cover" style={cover}>
            <div className="effect"></div>
            <div className="light"></div>
          </div>
          <div className="book-inside">
            <img src={bookImage} alt='bookcover' />
          </div>
        </div>
      </Link>
    </div>

  );
}
