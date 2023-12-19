import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TimesChart from '../components/TimesChart';
import './ChoseDatePage.css';

export default function ChosenDatePage() {
  const params = useParams();
  const date = params.date;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Water Level',
        data: [],
        fill: true,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.5,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/readings/${date}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data for the selected date');
        }

        const jsonData = await response.json();
        const data = jsonData.data; // Assuming the response has a "data" property

        setChartData({
          labels: data.map((entry: { time: any; }) => entry.time),
          datasets: [
            {
              label: 'Razina vode',
              data: data.map((entry: { waterLevel: any; }) => entry.waterLevel),
              fill: true,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              tension: 0.5,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', (error as Error).message);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div>
      <h2>Mjerenja za {date}</h2>
      <TimesChart chartData={chartData} />
    </div>
  );
}
