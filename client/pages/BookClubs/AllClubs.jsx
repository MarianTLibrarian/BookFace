import React, { useState, useEffect } from 'react';
import '../styles/BookClubs.css';

export default function BookClubs(props) {

  const [show, setShow] = useState(false)
  const text = props.club.bookclubInfo.description.substring(0, 200) + "...";


  return (
    <div className='club-container'>
      <div className='club'>
        <div className='col-left'>
          <div className='join-modal'>
            <button type='button'>JOIN</button>
          </div>
          <img src={props.club.bookclubInfo.imageUrl} alt='clubCover' />
        </div>
        <div className='col-right'>
          <p><b>{props.club.bookclubInfo.bookclubName}</b></p>
          <p>{props.club.bookclubInfo.membersCount} Memebers</p>
          <p><span>{text}</span></p>
        </div>
      </div>
    </div>
  )

}