import React from 'react';
import '../../client/pages/styles/Stats.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

// import PersonalBooks from '../../fakeData/books/personalBooks';

export default function PagesStats() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const state = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'Total Number of Pages Read',
        backgroundColor: '#EAA800',
        borderColor: '#EAA800',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

  return (
    <div className="stats-container">
      <h3>Total number of pages you have read over the years</h3>
      <div className="stats-graph-container">
        <Bar
          data={state}
          options={{
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
            }
            }
          }}
        />
      </div>
    </div>
  )
}