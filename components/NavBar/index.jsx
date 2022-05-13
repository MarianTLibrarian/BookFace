import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AccountMenu from './AccountMenu';

import { signInWithGoogle } from '../Firebase';
import useStore from '../../client/userStore';
import SearchBar from '../SearchBar';

export default function NavBar() {
  const { user, setUser, setToken, setUsersBookclubs, expressUrl } = useStore();
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

  useEffect(() => {
    if (user)
      fetch(`${expressUrl}/myBookclubs`, { params: { userId: user.uid } })
        .then(({ data }) => setUsersBookclubs(data.map((club) => club.bookclubInfo.bookclubName)))
        .catch(console.error);
    else setUsersBookclubs([]);
  }, [user]);

  return (
    <div className="nav-container">
      <div className="nav">
        <div className="logo">
          {' '}
          <NavLink exact to="/">
            <img alt="logo" src="../assets/logo.png" />
            <h3>BOOKFACE.</h3>
          </NavLink>
          <div className="clear" />
        </div>
        <div className="menu">
          <div
            className="nav-search"
            style={
              pathname === '/' || pathname === '/search'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
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
            {user ? 'My Clubs' : 'Clubs'}
          </NavLink>
          {user ? <AccountMenu /> : <a onClick={handleSignIn}>Sign In</a>}
        </div>
      </div>
    </div>
  );
}
