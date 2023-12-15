import React, { useState, useEffect } from 'react';
import './History.css';
import DaysChart from "../components/DaysChart";

interface ReadingData {
  date: string;
  meanValue: number;
}

interface UserData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export default function History() {
  const currentDate = new Date().toISOString().split('T')[0];

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const maxStartDate = threeDaysAgo.toISOString().split('T')[0];

  const createDefaultUserData = async (startDate: string, endDate: string): Promise<UserData> => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/readingsRange/${startDate}:${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch default data');
      }

      const jsonData = await response.json() as { data: ReadingData[] };
      const labels = jsonData.data.map((item) => item.date);
      const levels = jsonData.data.map((item) => item.meanValue);

      return {
        labels,
        datasets: [{
          label: "RazinaVode",
          data: levels,
        }]
      };
    } catch (error) {
      console.error('Error fetching default data:', (error as Error).message);
      return {
        labels: [],
        datasets: [{
          label: "RazinaVode",
          data: [],
        }]
      };
    }
  };

  const [userData, setUserData] = useState<UserData>({
    labels: [],
    datasets: [{
      label: "RazinaVode",
      data: [],
    }]
  });

  const [startDate, setStartDate] = useState<string>(maxStartDate);
  const [endDate, setEndDate] = useState<string>(currentDate);

  useEffect(() => {
    fetchDefaultData();
  }, [startDate, endDate]);

  const fetchDefaultData = async () => {
    const defaultData = await createDefaultUserData(maxStartDate, currentDate);
    setUserData(defaultData);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/readingsRange/${startDate}:${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      console.log(startDate)
      console.log(endDate)

      const jsondata = await response.json() as { data: ReadingData[] };
      console.log(jsondata.data)

      if (!Array.isArray(jsondata.data)) {
        throw new Error('Received data is not an array');
      }

      const labels = jsondata.data.map((item) => item.date);
      const levels = jsondata.data.map((item) => item.meanValue);

      setUserData({
        labels,
        datasets: [{
          label: "RazinaVode",
          data: levels,
        }]
      });
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    }
  };

  const resetData = () => {
    fetchDefaultData();
    setStartDate(maxStartDate);
    setEndDate(currentDate);
    console.log(maxStartDate)
    console.log(currentDate)
  };

  return (
    <div>
      <div className='diagram'>
        <DaysChart chartData={userData}/>
      </div>
      <div className='filters'>
        Start:
        <input
          id="start"
          type="date"
          min="2023-12-01"
          max={maxStartDate}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        End:
        <input
          id="end"
          type="date"
          min="2023-12-03"
          max={currentDate}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchData}>Filter</button>
        <button onClick={resetData}>Reset</button>
      </div>
    </div>
  );
}
