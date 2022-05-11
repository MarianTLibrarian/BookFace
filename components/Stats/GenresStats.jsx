import React from 'react';
import '../../client/pages/styles/Stats.css';
import { ResponsivePie } from '@nivo/pie'

const pieData = [
  {
    id: "Horror",
    label: "Horror",
    value: 1,
    color: "hsl(90, 70%, 50%)"
  },
  {
    id: "Psychology",
    label: "Psychology",
    value: 2,
    color: "hsl(56, 70%, 50%)"
  },
  {
    id: "Fiction",
    label: "Fiction",
    value: 3,
    color: "hsl(103, 70%, 50%)"
  },
  {
    id: "History",
    label: "History",
    value: 5,
    color: "hsl(186, 70%, 50%)"
  },
  {
    id: "Romance",
    label: "Romance",
    value: 1,
    color: "hsl(104, 70%, 50%)"
  }
];

export default function GenresStats () {
  return (
    <div className="genres-stats-container">
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        theme={{
          fontSize: 16
        }}
      />
      <div style={{ width: '20%' }} />
    </div>
  );
};
