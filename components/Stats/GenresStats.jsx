import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';

import { ResponsivePie } from '@nivo/pie';
import useStore from '../../client/userStore';

export default function GenresStats() {
  const { user } = useStore();
  const [genresStats, setGenresStats] = useState([]);
  // const [ResponsivePie, setResponsivePie] = useState(<div className="loading">loading</div>);

  const getGenresStats = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {
        const genresData = {
          id: '',
          value: 0,
        };
        for (let i = 0; i < data.results.length; i += 1) {
          if (data.results[i].readingStatus === 'read') {
            const genres = data.results[i].categories[0];
            genresData.id = genres;
            if (genresData.id) {
              genresData.value += 1;
            } else {
              genresData.value = 1;
            }
            setGenresStats([genresData]);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // setResponsivePie(() => import('@nivo/pie'));
    getGenresStats(user.uid);
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
