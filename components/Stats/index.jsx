import React, { useState, useEffect } from 'react';
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

  // To do: dynamically render the numbers
  const totalBooks = 1;
  const totalDays = 131;


  const [progressBar, setProgressBar] = useState(0)
  const UpdateNumbers = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1)
    }, 5)
  }

  useEffect(() => {
    if (totalBooks > 0) UpdateNumbers()
  }, [totalBooks])

  useEffect(() => {
    if (progressBar < totalBooks) UpdateNumbers()
  }, [progressBar])


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
                  You have read <span>{totalBooks}</span> book in the past <span>{totalDays}</span> days
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
