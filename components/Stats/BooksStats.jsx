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

import data from '../../fakeData/books/personalBooks';

export default function BooksStats() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const totalReadPerYear = {};
  const finishedTitle = [];

  for (let i = 0; i < data.results.length; i += 1) {
    const isRead = data.results[i].readingStatus === 'read';
    if (isRead) {
      finishedTitle.push(data.results[i].title);
      const year = data.results[i]['finish-read-date'].slice(0, 4);
      totalReadPerYear[year] = (totalReadPerYear[year] || 0) + 1;
    }
  }

  const state = {
    labels: Object.keys(totalReadPerYear),
    datasets: [
      {
        label: 'Total Number of Pages Read',
        backgroundColor: '#EAA800',
        borderColor: '#EAA800',
        borderWidth: 2,
        data: Object.values(totalReadPerYear)
      }
    ]
  }

  return (
    <div className="stats-container">
      <h3>Total number of books you have read over the years</h3>
      <div className="stats-graph-overall-container">
        {/* <div> Accordion to be added </div> */}
        <div className="stats-graph-container">
        <Bar
          data={state}
          options={{
            indexAxis: 'y',
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
    </div>
  )
}
