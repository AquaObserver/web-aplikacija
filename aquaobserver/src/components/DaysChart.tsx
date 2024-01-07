import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'chart.js';

Chart.register(annotationPlugin);


function BarChart({ chartData }: any) {
  const navigate = useNavigate();

  const handleBarClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const clickedDate = chartData.labels[elements[0].index];
      navigate(`/chosen-date/${clickedDate}`);
    }
  };

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



  console.log("Threshold: " + threshold);

  return <Bar
    data={chartData}
    width={10}
    height={800}
    options={{
      scales: {
        x: {

        },
        y: {
          beginAtZero: true,
          max: 100,
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      onClick: handleBarClick,
      plugins: {
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
      }
    }}
  />;
}

export default BarChart;
