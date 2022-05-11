import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';
// import SimpleAccordion from './Accordion';
import AccordionBookStats from './AccordionBookStats';

import data from '../../fakeData/books/personalBooks';

export default function BooksStats() {
  // const [bookStats, setBookStats] = useState([]);
  // const [bookData, setBookData] = useState([]);
  // const [years, setYears] = useState([]);

  // const booksPerYear = {};

  // useEffect(() => {
  //   dataFnc();
  // }, []);

  // const dataFnc = () => {
  //   let temp = [];
  //   const years = [];
  //   const totalReadPerYear = {};
  //   for (let i = 0; i < data.results.length; i++) {
  //     if (data.results[i].readingStatus === 'read') {
  //       temp.push(data.results[i]);
  //       let year = data.results[i]['finish-read-date'].slice(0, 4);
  //       years.push(year);
  //       totalReadPerYear[year] = (totalReadPerYear[year] || 0) + 1;
  //     }
  //   }
  //   setBookStats(temp);
  //   setYears(totalReadPerYear);
  // };

  // const booksData = () => {
  //   let data = {};
  //   for (let i = 0; i < bookStats.length; i += 1) {
  //     const year = bookStats[i]['finish-read-date'].slice(0, 4);
  //   }
  // };

  // // [{year:2022, total:10, books:[]},{year:2021, total:10, books:[]}]

  // const descYears = Object.keys(totalReadPerYear).reverse();
  // const totalBooksCount = Object.values(totalReadPerYear).reverse();
  // const bookCoverImages = Object.values(booksPerYear);

  // // need to update this
  // const arr = [1, 2, 3]
  // console.log('YEARS!!!', years)

  // const descYears = Object.keys(totalReadPerYear).reverse();
  // const totalBooksCount = Object.values(totalReadPerYear).reverse();
  // const bookCoverImages = Object.values(booksPerYear).reverse();

  // return (
  //   <div className="stats-container">
  //     <h3>Total number of books you have read over the years</h3>
  //     <div className="stats-graph-container">
  //       <div className="accordion">
  //         {arr.map((year) => (
  //           <AccordionBookStats bookStats={bookStats} />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
}