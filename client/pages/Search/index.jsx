import React, { useState, useEffect } from 'react';

import SearchBar from '../../../components/SearchBar';
import Trends from '../Home/Trends';
import AllClubs from '../BookClubs/AllClubs';
import useStore from '../../userStore';

import '../styles/Search.css';

const defaultRenderedItems = 'Loading ...';

export default function Search() {
  const searchQuery = useStore((state) => state.searchQuery);
  const searchFilter = useStore((state) => state.searchFilter) || 'books';
  const expressUrl = useStore((state) => state.expressUrl);
  const user = useStore((state) => state.user);

  const [renderedItems, setRenderedItems] = useState(defaultRenderedItems);

  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
    height: '50vh',
  };

  const searchBooks = async () => {
    const res = await fetch(`${expressUrl}/search?q=${searchQuery}`);
    const books = await res.json();

    return books.map((book) => book.volumeInfo);
  };

  const searchMyBooks = async () => {
    const { uid } = user;
    const res = await fetch(`${expressUrl}/books?userId=${uid}`);
    const { results } = await res.json();

    return results;
  };

  const searchClubs = async () => {
    const res = await fetch(`${expressUrl}/bookclubs`);
    const clubs = await res.json();

    return clubs;
  };

  const searchMyClubs = async () => {
    const { uid } = user;
    const res = await fetch(`${expressUrl}/myBookclubs?userId=${uid}`);
    const clubs = await res.json();

    return clubs;
  };

  useEffect(() => {
    if (!user || !searchQuery.trim()) {
      setRenderedItems(defaultRenderedItems);
    } else {
      (async () => {
        let result = defaultRenderedItems;

        switch (searchFilter) {
          case 'all':
          case 'books':
            result = (await searchBooks()).map((book) => (
              <Trends book={book} key={JSON.stringify(book.industryIdentifiers)} />
            ));
            break;

          case 'myBooks':
            result = (await searchMyBooks()).map((book) => (
              <Trends book={book} key={JSON.stringify(book.industryIdentifiers)} />
            ));
            break;

          case 'clubs':
            result = (await searchClubs()).map((club) => (
              <AllClubs club={club} user={user} key={Math.random()} />
            ));
            break;

          case 'myClubs':
            result = (await searchMyClubs()).map((club) => (
              <AllClubs club={club} user={user} key={Math.random()} />
            ));
            break;

          default:
            break;
        }

        setRenderedItems(result);
      })();
    }
  }, [searchQuery, searchFilter, user]);

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

      <div className="search-trends">
        <h1>{`${searchFilter} RESULTS`}</h1>
        <p>{`Here are some results related to '${searchQuery}'`}</p>
        <div className="search-trends-list">{renderedItems}</div>
      </div>
    </div>
  );
}
