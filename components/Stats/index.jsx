import React from 'react';

export default function Stats() {
  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  const totalBooks = 20;
  const totalDays = 267;

  const handleViewStats = () => {
    console.log('clicked')
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

            <div className="stats-dropdown">
              <button type="submit" className="drop-button">
                <div>BOOKS</div>
                <div>▼</div>
              </button>
              <div className="stats-dropdown-content">
                <ul>
                  <li onClick={handleViewStats}>BOOKS</li>
                  <li onClick={handleViewStats}>PAGES</li>
                  <li onClick={handleViewStats}>GENRE</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div className="stats-graph">
          This is where stats go
        </div>

      </div>
    </div>
  );
}
