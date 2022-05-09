import React from 'react';
import '../../client/pages/styles/Stats.css';

import PersonalBooks from '../../fakeData/books/personalBooks';

export default function BooksStats() {


  return (
    <div className="stats-container">
      <h3>Total number of books you have read over the years</h3>
      <div className="stats-graph-container">
        bar graph here
      </div>
    </div>
  );
}
