import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';

import Dropdown from './Dropdown';
import CalendarStats from './CalendarStats';
import BooksStats from './BooksStats';
import PagesStats from './PagesStats';
import GenresStats from './GenresStats';

export default function Stats() {
  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  const [allBooksCount, setAllBooksCount] = useState(0);
  const [totalRead, setTotalRead] = useState([]);

  const getTotal = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {
        setAllBooksCount(data.results.length);
        const temp = [];
        for (let i = 0; i < data.results.length; i += 1) {
          if (data.results[i].readingStatus === 'read') {
            temp.push(data.results[i])
            setTotalRead(temp)
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTotal(1);
  }, []);


  /// Animation to-do

  // const [progressBar, setProgressBar] = useState(0)
  // const UpdateNumbers = () => {
  //   setTimeout(() => {
  //     setProgressBar(progressBar + 1)
  //   }, 5)
  // }

  // useEffect(() => {
  //   if (totalBooks > 0) UpdateNumbers()
  // }, [totalBooks])

  // useEffect(() => {
  //   if (progressBar < totalBooks) UpdateNumbers()
  // }, [progressBar])


  ///

  const [menusView, setMenusView] = useState('BOOKS');
  const menus = ['BOOKS', 'PAGES', 'GENRES'];

  // To render selected stats
  const [currentView, setCurrentView] = useState('');

  const statsViews = () => {
    switch (currentView) {
      case 'BOOKS':
        return <BooksStats />;
      case 'PAGES':
        return <PagesStats />;
      case 'GENRES':
        return <GenresStats />;
      default:
        return <BooksStats />;
    }
  }

  return (
    <div className="Stats">
      <div className="stats-header-container">
        <div className="header" style={style}>
          <div className="filter"></div>
          <div className="main-content">
            <div>
              <div className="main-stats">
                <h1>
                  You have read <span>{totalRead.length}</span> out of <span>{allBooksCount}</span> books
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-upper-section">

        <div className="stats-calendar-container">
        <CalendarStats />
        </div>

        <div className="stats-bottom-section">
          <div className="stats-sidebar">
            <h3>READING STATS</h3>
            <div className="sidebar-divider">
              <Dropdown
                menus={menus}
                menusView={menusView}
                handleMenuView={setMenusView}
                handleViewChange={setCurrentView}
              />
            </div>
          </div>
          {statsViews()}
        </div>
      </div>

    </div>
  );
}
