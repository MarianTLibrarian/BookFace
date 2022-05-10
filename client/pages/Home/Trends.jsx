import React from 'react';

export default function Trends({ book }) {
  return (
    <div className="trends-book">
      <img src={book.book_image} alt="bookcover" />
    </div>
  );
}
