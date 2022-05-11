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

export default function PagesStats() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const totalPagesPerYear = {};
  for (let i = 0; i < data.results.length; i += 1) {
    const isRead = data.results[i].readingStatus === 'read';
    if (isRead) {
      const year = data.results[i]['finish-read-date'].slice(0, 4);
      const totalPages = data.results[i].pageCount;
      if (totalPagesPerYear[year]) {
        totalPagesPerYear[year] += totalPages;
      } else {
        totalPagesPerYear[year] = totalPages || 0;
      }
    }
  }

  const state = {
    labels: Object.keys(totalPagesPerYear).reverse(),
    datasets: [
      {
        label: 'Total Number of Pages',
        backgroundColor: ["#f47560", "#e8c1a0", "#61cdbb", "#97e3d5"],
        borderColor: ["#f47560", "#e8c1a0", "#61cdbb", "#97e3d5"],
        borderWidth: 2,
        data: Object.values(totalPagesPerYear).reverse()
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
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 16
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 30,
                    weight: 'bold'
                  }
                },
                grid: {
                  display: false,
                }
              }
            },
            label: {
              fontSize: 20
            },
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                titleFont: {
                  size: 20
                },
                bodyFont: {
                  size: 16
                },
              },
            }
          }}
        />
      </div>
    </div>
  )
}


