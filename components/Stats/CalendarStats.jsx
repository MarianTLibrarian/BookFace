import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../client/pages/styles/Stats.css';
import useStore from '../../client/userStore';

export default function CalendarStats() {
  const { user } = useStore();
  const [calendarStats, setCalendarStats] = useState([]);
  const [ResponsiveCalendar, setResponsiveCalendar] = useState(<div className="loading">loading</div>);

  const getCalendarStats = (uid) => {
    axios
      .get('http://localhost:3030/books', { params: { userId: uid } })
      .then(({ data }) => {
        const eachDay = {
          value: 0,
          day: '',
        };
        for (let i = 0; i < data.results.length; i += 1) {
          if (data.results[i].readingStatus === 'read') {
            eachDay.day = data.results[i].endReadDate;
            if (eachDay.day) {
              eachDay.value += 1;
            } else {
              eachDay.value = 1;
            }
            setCalendarStats(eachDay);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const calStartEndDate = calendarStats.day;

  useEffect(() => {
    setResponsiveCalendar(() => import('@nivo/pie'));
    getCalendarStats(user.uid);
  }, []);

  return (
    <div className="stats-calendar">
      <div>
        <h3 style={{'color': '#808080'}}>Your readings this year</h3>
      </div>
      {calendarStats.length === 0 ?
        <ResponsiveCalendar
          data={[calendarStats]}
          from='2022-01-09'
          to='2022-08-09'
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
        :
        <ResponsiveCalendar
          data={[calendarStats]}
          from={calStartEndDate}
          to={calStartEndDate}
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
      }
    </div>
  );
}
