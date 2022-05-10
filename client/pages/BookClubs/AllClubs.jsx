import React, { useState } from 'react';
import '../styles/BookClubs.css';

export default function BookClubs({ club }) {
  const { imageUrl, bookclubName, membersCount, description } = club.bookclubInfo;

  const [show, setShow] = useState(false);
  const text = `${description.substring(0, 200)}...`;


  return (
    <div className='club-container'>
      <div className='club'>
        <div className='col-left'>
          <div className='join-modal'>
            <button type='button'>JOIN</button>
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
