import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TimesChart from '../components/TimesChart';
import jsonData from '../Data.json';

export default function ChosenDatePage() {
    const params = useParams();
    const date = params.date;

    const filteredData = jsonData.byHours.filter((data) => data.date === date);

    const chartData = {
        labels: filteredData.map((data) => `${data.date} ${data.time}`),
        datasets: [
          {
            label: 'Level',
            data: filteredData.map((data) => data.level),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };
    

    return (
    <div>
      <h2>Measures for {date}</h2>
      <TimesChart chartData={chartData} />
    </div>
  );
}