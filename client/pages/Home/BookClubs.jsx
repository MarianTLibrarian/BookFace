import React from 'react';

export default function BookClubs({ club }) {
  const { imageUrl, bookclubName, membersCount } = club.bookclubInfo;

  return (
    <div className="club-container">
      <div className="club">
        <div className="col-left">
          <img src={imageUrl} alt="clubCover" />
        </div>
        <div className="col-right">
          <p>
            <b>{bookclubName}</b>
          </p>
          <p>{membersCount} Memebers</p>
        </div>
      </div>
    </div>
  );
}
