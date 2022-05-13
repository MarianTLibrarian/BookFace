import React from 'react';
import { Link } from 'react-router-dom';

export default function Carousel({ club, width, carouselClick }) {

const { imageUrl, bookclubName, membersCount, description } = club.bookclubInfo;

  const onImgLoad = ({ target: img }) => {
    width(img.offsetWidth)
  }

  const text = `${description.substring(0, 150)}...`;



  return (
    <div className='my-club-info'>
      <Link to='/bookclubdetail'>
        <img onLoad={onImgLoad} src={imageUrl} alt='clubImage' onClick={carouselClick} value={bookclubName} />
      </Link>
      <div className='club-detail'>
        <h2>{bookclubName}</h2>
        <h3>{membersCount} Members</h3>
        <p>{text}</p>
        <Link to='/bookclubdetail'>
        <div className='btn'>
          <button type='button'onClick={carouselClick} value={bookclubName}>MORE</button>
        </div>
        </Link>
      </div>
    </div>
  );
}