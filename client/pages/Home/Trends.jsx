import React from 'react';
import '../../../assets/testBook.jpg';

export default function Trends({ book }) {
  // let bookImage = '../../../assets/testBook.jpg';
  const [bookImage, setBookImage] = React.useState('../../../assets/testBook.jpg');

  React.useEffect(() => {
    console.log({ imgs: book.imageLinks });

    // Why does the database have a different structure? (T_T)
    if (Object.hasOwnProperty.call(book, 'book_image')) {
      setBookImage(book.book_image);
    } else if (Object.hasOwnProperty.call(book, 'imageLinks')) {
      setBookImage(book.imageLinks.thumbnail || book.imageLinks.smallThumbnail);
    } else {
      setBookImage('../../../assets/testBook.jpg');
    }
  }, [book]);

  return (
    <div className="trends-book">
      <img src={bookImage} alt="bookcover" />
    </div>
  );
}
