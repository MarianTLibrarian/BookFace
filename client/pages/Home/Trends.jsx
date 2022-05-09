import React from 'react';

export default function Trends(props) {

  return (
    <div className='trends-book'><img src={props.book.book_image} alt='bookcover' /></div>
  )
}