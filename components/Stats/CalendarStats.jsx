import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';

import { ResponsiveCalendar } from '@nivo/calendar';
import useStore from '../../client/userStore';

const tempStats = [
  {
    "value": 0,
    "day": "2022-02-04"
  }
];

export default function CalendarStats() {
  const { user } = useStore();
  const [calendarStats, setCalendarStats] = useState([]);
  // const [ResponsiveCalendar, setResponsiveCalendar] = useState(<div className="loading">loading</div>);

  const getCalendarStats = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {

        const readBooks = data.results.filter((element) => element.readingStatus === 'read');

        const calObj = readBooks
          .map((book) => book.endReadDate)
          .reduce((dateCounts, date) => {
            dateCounts[date] = (dateCounts[date] || 0) + 1;
            return dateCounts;
          }, {});

        setCalendarStats(Object.entries(calObj).map(([day, value]) => ({ value, day })));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // setResponsiveCalendar(() => import('@nivo/calendar'));
    getCalendarStats(user.uid);
    // getCalendarStats(1);
  }, []);

  return (
    <div className="stats-calendar">
      <div>
        <h3 style={{ color: '#808080' }}>Your readings this year</h3>
      </div>
      {calendarStats.length === 0 ? (
        <ResponsiveCalendar
          data={tempStats}
          from="2022-01-09"
          to="2022-08-09"
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      ) : (
        <ResponsiveCalendar
          data={calendarStats}
          from="2022-01-09"
          to="2022-08-09"
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      )}
    </div>
  );
}
