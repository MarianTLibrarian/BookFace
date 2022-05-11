import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function PagesStats() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [totalPagesPerYear, setTotalPagesPerYear] = useState({});

  const getPagesTotal = (uid) => {
    axios.get('http://localhost:3030/books', { params: {userId: uid} })
    .then(({data}) => {
      const yearData = {};
      for (let i = 0; i < data.results.length; i += 1) {
          if (data.results[i].readingStatus === 'read') {
            const year = data.results[i].endReadDate.slice(0, 4);
            if (yearData[year]) {
              yearData[year] += data.results[i].pageCount;
            } else {
              yearData[year] = data.results[i].pageCount;
            }
            setTotalPagesPerYear(yearData)
          }
        }
      })
      .catch(err => {
        console.error(err);
      })
    }

  useEffect(() => {
    getPagesTotal(1);
  },[])

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


