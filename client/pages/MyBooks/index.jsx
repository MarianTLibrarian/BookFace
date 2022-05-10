import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import Carousel from './carousel';
import useStore from '../../userStore';
import data from '../../../fakeData/books/personalBooks';

export default function MyBooks() {
  const [books, setBooks] = useState(data);

  const { user } = useStore();
  console.log('user', user);

  // const getBooks = function() {
  //   axios.get('/books')
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  useEffect(() => {
    setBooks(data);
  });

  return (
    <div>
      <div className="sidebar">
        <SideBar />
        <Carousel books={books.results} />
      </div>
    </div>
  );
}
