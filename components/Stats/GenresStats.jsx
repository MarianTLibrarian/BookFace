import React from 'react';
import '../../client/pages/styles/Stats.css';

import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import data from '../../fakeData/books/personalBooks';

export default function GenresStats() {
  ChartJS.register(ArcElement, Legend, Tooltip);

  const totalReadPerGenre = {};

  for (let i = 0; i < data.results.length; i += 1) {
    const isRead = data.results[i].readingStatus === 'read';
    if (isRead) {
      const genres = data.results[i].categories; // array
      for (let j = 0; j < genres.length; j += 1) {
        const genre = genres[j];
        totalReadPerGenre[genre] = (totalReadPerGenre[genre] || 0) + 1;
      }
    }
  }

  const state = {
    labels: Object.keys(totalReadPerGenre),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        borderWidth: 2,
        data: Object.values(totalReadPerGenre),
      },
    ],
  };

  return (
    <div className="stats-container" style={{ width: '50vw'}}>
      <h3>Genres You Enjoyed The Most</h3>
      <div className="stats-graph-container">
        <Doughnut
          data={state}
          options={{
            title: {
              display: false,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </div>
    </div>
  );
}
