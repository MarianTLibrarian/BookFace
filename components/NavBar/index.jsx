import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AccountMenu from './AccountMenu';

import { signInWithGoogle } from '../Firebase';
import useStore from '../../client/userStore';
import SearchBar from '../SearchBar';

export default function NavBar() {
  const { user, setUser, setToken } = useStore();
  const { pathname } = useLocation();

  const handleSignIn = () => {
    if (!user) {
      signInWithGoogle()
        .then((result) => {
          if (!result || !result.user || !result.token) throw result;

          const { user: newUser, token } = result;

          localStorage.setItem('user_data', JSON.stringify(newUser));

          setUser(newUser);
          setToken(token);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="nav-container">
      <div className="nav">
        <div className="logo">
          {' '}
          <a href="/">
            <img alt="logo" src="../assets/logo.png" />
            <h3>BOOKFACE.</h3>
          </a>
          <div className="clear" />
        </div>
        <div className="menu">
          <div
            className="nav-search"
            style={pathname === '/' ? { visibility: 'hidden' } : { visibility: 'visible' }}
          >
            <SearchBar />
          </div>
          <NavLink exact to="/">
            Home
          </NavLink>
          {user ? (
            <NavLink activeClassName="active" to="/mybooks">
              My Books
            </NavLink>
          ) : null}
          <NavLink activeClassName="active" to="/bookclubs">
            {user ? 'My clubs' : 'Clubs'}
          </NavLink>
          {user ? <AccountMenu /> : <a onClick={handleSignIn}>Sign In</a>}
        </div>
      </div>
    </div>
  );
}
