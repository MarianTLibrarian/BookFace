import React from 'react';
import { NavLink } from 'react-router-dom';

import { signInWithGoogle, userSignOut } from '../Firebase';
import useStore from '../../client/userStore';

export default function NavBar() {
  const { user, setUser, setToken } = useStore();

  const handleSignIn = () => {
    if (user) {
      return userSignOut().then(() => {
        localStorage.removeItem('user_data');
        setUser(null);
      });
    }

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

          <NavLink activeClassName="active" to="/mybooks">
            My Books
          </NavLink>
          <NavLink activeClassName="active" to="/bookclubs">
            My Clubs
          </NavLink>
          <NavLink activeClassName="active" to="#" onClick={handleSignIn}>
            {user ? 'Sign Out' : 'Sign In'}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
