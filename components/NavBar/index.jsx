import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu';

import { signInWithGoogle } from '../Firebase';
import useStore from '../../client/userStore';

export default function NavBar() {
  const { user, setUser, setToken } = useStore();

  const handleSignIn = () => {
    if (!user) {
      return signInWithGoogle()
        .then((result) => {
          if (!result || !result.user || !result.token) throw result;

          const { user: newUser, token } = result;

          localStorage.setItem('user_data', JSON.stringify(newUser));

        setUser(newUser);
        setToken(token);
      })
      .catch(console.error);
  };
}

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
          <NavLink exact to="/">
            Home
          </NavLink>
          {user ?
            <NavLink activeClassName="active" to="/mybooks">
              My Books
            </NavLink>
            : null
          }
          <NavLink activeClassName="active" to="/bookclubs">
            {user ? 'My clubs' : 'Clubs'}
          </NavLink>
          {user ?
            <AccountMenu />
            : <a onClick={handleSignIn} >Sign In</a>
          }
        </div>
      </div>
    </div>
  );
}
