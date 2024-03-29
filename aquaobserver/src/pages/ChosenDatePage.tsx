import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimesChart from "../components/TimesChart";
import "../index.css";

export default function ChosenDatePage() {
  const params = useParams();
  const date = params.date;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Water Level",
        data: [],
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.5,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/readings/${date}`, {
          headers: {
            "ngrok-skip-browser-warning": "any-value",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data for the selected date");
        }

        const jsonData = await response.json();
        const data = jsonData.data; // Assuming the response has a "data" property

        setChartData({
          labels: data.map((entry: { time: any; }) => {
            // Split entry.time by dot and take the first part (without milliseconds)
            const timeParts = entry.time.split('.');
            return timeParts[0];
          }),
          datasets: [
            {
              label: "Razina vode",
              data: data.map((entry: { waterLevel: any }) => entry.waterLevel),
              fill: true,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              tension: 0.5,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div>
      <div className="header2">Mjerenja za {date}</div>
      <TimesChart chartData={chartData} />
    </div>
  );
}
