import React, { useState } from 'react';
import '../styles/BookClubs.css';

export default function BookClubs({ club }) {
  const { imageUrl, bookclubName, membersCount, description } = club.bookclubInfo;

  const [show, setShow] = useState(false);
  const text = `${description.substring(0, 200)}...`;

<<<<<<< HEAD

  return (
    <div className='club-container'>
      <div className='club'>
        <div className='col-left'>
          <div className='join-modal'>
            <button type='button'>JOIN</button>
=======
  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className="club-container">
      <div
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
        className={`${show ? 'show club' : 'club'}`}
      >
        <div className="col-left">
          <div className="join-modal">
            <button type="button">JOIN</button>
>>>>>>> c7762a3c9ad2dec3df68bb43f9f7c907a4c1bc94
          </div>
          <img src={imageUrl} alt="clubCover" />
        </div>
        <div className="col-right">
          <p>
            <b>{bookclubName}</b>
          </p>
          <p>{membersCount} Memebers</p>
          <p>
            <span>{text}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
