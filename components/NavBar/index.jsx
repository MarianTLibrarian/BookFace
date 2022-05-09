import React from 'react';
import { NavLink } from 'react-router-dom';

import { signInWithGoogle } from '../Firebase';

export default function NavBar() {
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="logo">
          <img alt="logo" src="../assets/logo.png" />
          <h3>BOOKFACE.</h3>
          <div className="clear" />
        </div>
        <div className="menu">
          <NavLink
            activeStyle={{
              fontWeight: 'bold',
              color: 'black',
            }}
            exact
            to="/"
          >
            Home
          </NavLink>

          <NavLink activeClassName="active" to="/mybooks">
            My Books
          </NavLink>
          <NavLink activeClassName="active" to="/bookclubs">
            My Clubs
          </NavLink>
          <NavLink activeClassName="active" to="#" onClick={signInWithGoogle}>
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
