import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import  zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);


function TimesChart({ chartData }: any) {

  const [threshold, setThreshold] = useState<number | null>(null);

  useEffect(() => {
    async function fetchThreshold() {
      try {
        const response = await fetch(`/api/userThreshold/`, {
          headers: {
            "ngrok-skip-browser-warning": "any-value",
          },
        });
        const data = await response.json();
        setThreshold(Number(data.threshold));
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }

    fetchThreshold();
  }, []);

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
                max:100,
              },
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: threshold as string | number | ((ctx: any, options: any) => any) | undefined,
                yMax: threshold as string | number | ((ctx: any, options: any) => any) | undefined,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        
      }}
    />
  );
}

export default TimesChart;
