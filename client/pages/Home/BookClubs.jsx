import React from 'react';

import { Link } from 'react-router-dom';
import useStore from '../../userStore';



export default function BookClubs({ club }) {
  const { imageUrl, bookclubName, membersCount } = club.bookclubInfo;

  const setBookclubDetails = useStore(state => state.setBookclubDetails);
  const bookclubDetails = useStore(state => state.bookclubDetails);


  // const setBookclubName = useStore(state => state.setBookclubName);
  // const clubName = useStore(state => state.clubName);

  return (
    <div className="club-container" onClick={(e)=>{setBookclubDetails(club)}
      }>
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
