import React from 'react';
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

/>;
}

export default BarChart;
