import React from 'react';
import { Line } from 'react-chartjs-2';
import  zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';

Chart.register(zoomPlugin);

function TimesChart({ chartData }: any) {
  return (
    <Line
      data={chartData}
      height={100}
      options={{
        scales: {
          x: {
            min: 0,
        max: 100,
          },
          y: {
            beginAtZero: true,
            min:0,
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
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'x',
            },
            limits: {
              y: {
                min: 0,
              },
            }
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
  );
}

export default TimesChart;
