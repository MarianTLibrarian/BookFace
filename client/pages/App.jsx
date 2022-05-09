import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  // Switch,
  Route,
  // Link
} from 'react-router-dom';

import Home from './Home';
import BookClubs from './BookClubs';
import BookClubDetail from './BookClubDetail';
import MyBooks from './MyBooks';
import BookDetail from './BookDetail';
import Stats from '../../components/Stats';
import NavBar from '../../components/NavBar';

function NotFound() {
  return <>You have landed on a page that does not exist</>;
}

export default function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/bookdetail" element={<BookDetail />} />
          <Route path="/bookclubs" element={<BookClubs />} />
          <Route path="/bookclubdetail" element={<BookClubDetail />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={NotFound} />
        </Routes>
        {/* Stretch: <LiveChat /> */}
      </Router>
    </div>
  );
}
