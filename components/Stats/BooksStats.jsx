import React from 'react';
import '../../client/pages/styles/Stats.css';
import SimpleAccordion from './Accordion';

import data from '../../fakeData/books/personalBooks';

export default function BooksStats() {
  const totalReadPerYear = {};
  const booksPerYear = {};
  // const url = [];

  for (let i = 0; i < data.results.length; i += 1) {
    const isRead = data.results[i].readingStatus === 'read';
    if (isRead) {
      const year = data.results[i]['finish-read-date'].slice(0, 4);
      totalReadPerYear[year] = (totalReadPerYear[year] || 0) + 1;

      const url = data.results[i].imageLinks.smallThumbnail;

      // console.log(year, ' -> URL IS: ', url)
      booksPerYear[year] = url;
      if (booksPerYear[year]) {
        // console.log('DUPLICATE: ', year)
      }

    }
  }

  const descYears = Object.keys(totalReadPerYear).reverse();
  const totalBooksCount = Object.values(totalReadPerYear).reverse();
  const bookCoverImages = Object.values(booksPerYear).reverse();

  return (
    <div className="stats-container">
      <h3>Total number of books you have read over the years</h3>
      <div className="stats-graph-container">
        <SimpleAccordion years={descYears} booksCount = {totalBooksCount} books={bookCoverImages} />
      </div>
    </div>
  )
}