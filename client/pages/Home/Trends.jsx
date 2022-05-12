import React from 'react';
import { Link } from 'react-router-dom';


export default function Trends({ book }) {
  return (
    <div className="trends-book">
      <Link to='/bookdetail'>
        <img src={book.book_image} alt="bookcover" />
      </Link>
    </div>

  );
}
