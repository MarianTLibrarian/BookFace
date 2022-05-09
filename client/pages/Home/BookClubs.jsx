import React from 'react';

export default function BookClubs(props) {

  return (
    <div className='club-container'>
      <div className='club'>
        <div className='col-left'>
          <img src={props.club.bookclubInfo.imageUrl} alt='clubCover'/>
        </div>
        <div className='col-right'>
          <p><b>{props.club.bookclubInfo.bookclubName}</b></p>
          <p>{props.club.bookclubInfo.membersCount} Memebers</p>
        </div>
      </div>
    </div>
  )
}