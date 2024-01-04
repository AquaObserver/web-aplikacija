import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';


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

  const arbitraryLines = {
    id: 'arbitraryLines',
    beforeDatasetsDraw(chart: any, args: any, plugins: any) {
      const {ctx, scales: {x, y}, chartArea: {left, right}} = chart;

      ctx.save();

      function drawLine(lineThickness: any, lineColor: any, yCoor: any) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineThickness;
        ctx.moveTo(left, y.getPixelForValue(yCoor));
        ctx.lineTo(right, y.getPixelForValue(yCoor));
        ctx.stroke();
      }

      if (threshold !== null) {
        drawLine(5, 'red', threshold);
      }  
    }
  }

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
}}
plugins={[arbitraryLines]}
/>;
}

export default BarChart;
