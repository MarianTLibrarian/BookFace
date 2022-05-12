import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Stats.css';
import useStore from '../../userStore';

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954',
};

export default function ReadingStatsWidget () {
  const { user } = useStore();
  const [progressBar, setProgressBar] = useState(0);
  const [allBooksCount, setAllBooksCount] = useState(0);
  const [totalRead, setTotalRead] = useState([]);

  const trailSpaced='true';
  const speed='.3';
  const percentage = Math.round((totalRead / allBooksCount) * 100);
  const pace = percentage / speed;

  const getTotal = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {
        setAllBooksCount(data.results.length);
        const temp = [];
        for (let i = 0; i < data.results.length; i += 1) {
          if (data.results[i].readingStatus === 'read') {
            temp.push(data.results[i])
            setTotalRead(temp.length)
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
    };

  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  useEffect(() => {
    getTotal(JSON.parse(user).uid);
  }, []);

  useEffect(() => {
    if (percentage > 0) updatePercentage();
  }, [percentage]);

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
  }, [progressBar]);

  return (
      <figure
        className="reading-goal"
        style={{width: '70%', 'margin': '10px'}}
      >
        <svg viewBox={circleConfig.viewBox}>
          <circle
            className="donut-ring"
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="var(--dark-beige)"
            strokeWidth='5'
            strokeDasharray={trailSpaced ? 1 : 0}
          />

          <circle
            className="donut-segment"
            cx={circleConfig.x}
            cy={circleConfig.y}
            r={circleConfig.radio}
            fill="transparent"
            stroke="var(--sunset)"
            strokeWidth="5"
            strokeDasharray={`${progressBar} ${100 - progressBar}`}
            strokeDashoffset={INITIAL_OFFSET}
          />

          <g className="chart-text">
            <text x="50%" y="50%" className="chart-number">
              {progressBar}%
            </text>
            <text x="50%" y="50%" className="chart-label">
              BOOKS READ
            </text>
          </g>
        </svg>
      </figure>
  );
}