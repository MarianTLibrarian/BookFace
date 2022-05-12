import React from 'react';


export default function Carousel({ club, width }) {

  const { imageUrl, bookclubName, membersCount, description } = club.bookclubInfo;

  const onImgLoad = ({ target: img }) => {
    width(img.offsetWidth)
  }

  const text = `${description.substring(0, 150)}...`;


  return (
    <div className='my-club-info'>
      <img onLoad={onImgLoad} src={imageUrl} alt='clubImage' />
      <div className='club-detail'>
        <h2>{bookclubName}</h2>
        <h3>{membersCount} Members</h3>
        <p>{text}</p>
        <div className='btn'>
          <button type='button'>MORE</button>
        </div>
      </div>
    </div>
  );
}