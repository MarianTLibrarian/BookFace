import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';
import { ResponsivePie } from '@nivo/pie';

export default function GenresStats() {
  const [genresStats, setGenresStats] = useState([]);

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
    getGenresStats(1);
  }, []);

  return (
    <div className="genres-stats-container">
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
    </div>
  );
}
