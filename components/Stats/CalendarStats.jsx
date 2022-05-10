import React from 'react';
import '../../client/pages/styles/Stats.css';
import { ResponsiveCalendar } from '@nivo/calendar';

import data from '../../fakeData/books/personalBooks';

export default function CalendarStats () {

  let calendarData = [];
  let count = 0;

  for (let i = 0; i < data.results.length; i += 1) {

    const isRead = data.results[i].readingStatus === 'read';

    if (isRead) {
      const date = data.results[i]['finish-read-date'];

      if (date) {
        count = 1;
      } else {
        count += 1;
      }

      const eachDate = {
        value: count,
        day: date
      };
      calendarData = [...calendarData, eachDate];
    }
  }

  return (
    <div className="stats-calendar">
      <div>
        <h3>Your readings this year</h3>
      </div>
      <ResponsiveCalendar
        data={calendarData}
        from="2022-01-08"
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
    </div>
  );
};
