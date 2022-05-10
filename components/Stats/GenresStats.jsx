import React from 'react';
import '../../client/pages/styles/Stats.css';

import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// import PersonalBooks from '../../fakeData/books/personalBooks';

export default function GenresStats() {
  ChartJS.register(ArcElement, Legend, Tooltip);

  const state = {
    labels: ['Horror', 'Mystery', 'Fiction'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        borderWidth: 2,
        data: [65, 59, 80],
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
