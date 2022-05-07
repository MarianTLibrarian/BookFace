import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
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

      {/* <NavLink exact activeClassName="active" to="/">Home</NavLink> */}
      <NavLink activeClassName="active" to="/mybooks">My Books</NavLink>
      <NavLink activeClassName="active" to="/bookclubs">My Clubs</NavLink>
      {/* FIXME: This should just trigger a login, not link to a page
       <NavLink activeClassName="active" to="">Sign In</NavLink> */}
    </nav>
  );
}
