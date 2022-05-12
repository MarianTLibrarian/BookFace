import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from '../../../components/SearchBar';
import useStore from '../../userStore';

import '../styles/Search.css';

export default function Search() {
  const searchQuery = useStore((state) => state.searchQuery);
  const searchHistory = useStore((state) => state.searchHistory);
  const setSearchHistory = useStore((state) => state.setSearchHistory);
  const expressUrl = useStore((state) => state.expressUrl);
  const user = useStore((state) => state.user);

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  const searchBooks = async () => {
    const res = await fetch(`${expressUrl}/search?q=${searchQuery}`);
    const { volumeInfo } = await res.json();

    // TODO: setSearchHistory

    return volumeInfo;
  };

  const searchMyBooks = async () => {
    const { uid } = user;
    const res = await fetch(`${expressUrl}/books?userId=${uid}`);
    const { results } = await res.json();

    // TODO: setSearchHistory

    return results;
  };

  const searchPopularBooks = async () => {
    const res = await fetch(`${expressUrl}/popularBooks`);
    const { books } = await res.json();

    // TODO: setSearchHistory

    return books;
  }

  const searchClubs = async () => {
    const res = await fetch(`${expressUrl}/bookclubs`);
    const clubs = await res.json();

    // TODO: setSearchHistory

    return clubs;
  }

  const searchMyClubs = async () => {
    const { uid } = user;
    const res = await fetch(`${expressUrl}/myBookclubs?userId=${uid}`);
    const clubs = await res.json();

    // TODO: setSearchHistory

    return clubs;
  };

  return (
    <div className="Home">
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <div className="search-search-bar">
              <div />
              <SearchBar />
              <div />
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor diam vitae
            interdum molestie. In placerat suscipit velit, gravida pretium velit maximus id. Duis ut
            felis maximus, suscipit orci vitae, porta metus.
          </p>
        </div>
      </div>

      <div className="trends">
        <h1>TRENDS</h1>
        <p>Simple is Better.</p>
        <div className="trends-list">trends</div>
      </div>

      <div className="featured-clubs">
        <div className="left">
          <div>
            <h3>FEATURED</h3>
            <h1>BOOK CLUBS</h1>
          </div>
        </div>
        <div className="right">
          <div className="clubs-list">
            clubs
            <div className="clear" />
          </div>
        </div>
      </div>
    </div>
  );
}
