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
import { Bar } from 'react-chartjs-2';
import useStore from '../../client/userStore';

export default function BookStats() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const { user } = useStore();
  const [totalReadPerYear, setTotalReadPerYear] = useState({});

  const getBooksTotal = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {
        const yearData = {};
        for (let i = 0; i < data.results.length; i += 1) {
          if (data.results[i].readingStatus === 'read') {
            const year = data.results[i].endReadDate.slice(0, 4);
            yearData[year] = (yearData[year] || 0) + 1;
            setTotalReadPerYear(yearData);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getBooksTotal(JSON.parse(user).uid);
  }, []);

  const state = {
    labels: Object.keys(totalReadPerYear).reverse(),
    datasets: [
      {
        label: 'Total Number of Books',
        backgroundColor: ['#61cdbb', '#f47560', '#e8c1a0', '#97e3d5'],
        borderColor: ['#61cdbb', '#f47560', '#e8c1a0', '#97e3d5'],
        borderWidth: 2,
        maxBarThickness: 70,
        data: Object.values(totalReadPerYear).reverse(),
      },
    ],
  };

  return (
    <div className="stats-container">
    {state.labels.length === 0 ? (
        <div className="genres-no-data">
          <h2>You have not read any books yet!</h2>
          <iframe
            src="https://giphy.com/embed/xUA7b2OfgTuVzqpVXq"
            width="480"
            height="480"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <>
          <h3>Total number of books you have read over the years</h3>
          <div className="stats-graph-container">
            <Bar
              data={state}
              options={{
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 16,
                      },
                      precision: 0
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 30,
                        weight: 'bold',
                      },
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
                label: {
                  fontSize: 20,
                },
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    titleFont: {
                      size: 20,
                    },
                    bodyFont: {
                      size: 16,
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )
    }
    </div>
  );
}
