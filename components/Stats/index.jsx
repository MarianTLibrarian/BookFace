import React, { useState } from 'react';
import '../../client/pages/styles/Stats.css';

import Dropdown from './Dropdown';
import BooksStats from './BooksStats';
import PagesStats from './PagesStats';
import GenresStats from './GenresStats';


export default function Stats() {
  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  // To do: dynamically render the numbers
  const totalBooks = 20;
  const totalDays = 267;

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
                  You have read {totalBooks} books in the past {totalDays} days
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="stats-banner">
          <p>Did you know? Regular Readers Contribute to Their Communities More.</p>
        </div>
      </div>

      <div className="stats-section">
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
  );
}
