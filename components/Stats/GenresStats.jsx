import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';

import { ResponsivePie } from '@nivo/pie';
import useStore from '../../client/userStore';

const tempStats = [
  {
    id: 'Fiction',
    value: 2
  },
  {
    id: 'Biography & Autobiography',
    value: 1,
  }
];

export default function GenresStats() {
  const { user } = useStore();
  const [genresStats, setGenresStats] = useState([]);
  // const [ResponsivePie, setResponsivePie] = useState(<div className="loading">loading</div>);

  const getGenresStats = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {

        const readBooks = data.results.filter((element) => element.readingStatus === 'read');

        const genreObj = readBooks
          .map((book) => book.categories[0])
          .reduce((genreCounts, genre) => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            return genreCounts;
          }, {});

        setGenresStats(Object.entries(genreObj).map(([id, value]) => ({ id, value })));

      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getGenresStats(user.uid);
    // setResponsivePie(() => import('@nivo/pie'));
    // getGenresStats(1);
  }, []);

  return (
    <div className="genres-stats-container">
    {genresStats.length === 0 ?
      <div className="genres-no-data">
        <h2>You have not read any books yet!</h2>
        <iframe src="https://giphy.com/embed/xUA7b2OfgTuVzqpVXq" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
      :
      <>
        <ResponsivePie
          data={genresStats}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          theme={{
            fontSize: 16,
          }}
        />
        <div style={{ width: '20%' }} />
      </>
    }
    </div>
  );
}
