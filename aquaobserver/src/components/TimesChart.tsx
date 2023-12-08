import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

function TimesChart({ chartData }: any) {
  return (
    <Line
      data={chartData}
      height={100}
      options={{
        scales: {
          x: {
            
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              mode: 'x',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
  );
}

export default TimesChart;
