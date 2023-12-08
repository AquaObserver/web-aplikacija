// MyComponent.js
import React, { useState } from 'react';
import './History.css';
import DaysChart from "../components/DaysChart";
import ChosenDatePage from './ChosenDatePage';
import UserData from '../Data.json';


export default function History() {
  const defaultUserData = {
    labels: UserData.byDate.map((data) => data.date),
    datasets: [{
      label: "RazinaVode",
      data: UserData.byDate.map((data) => data.level),
    }]
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [startDate, setStartDate] = useState('2023-12-02');
  const [endDate, setEndDate] = useState('2023-12-05');

  const filterData = () => {
    const filteredData = UserData.byDate.filter((data) => {
        const dataDateObject = new Date(data.date);
        console.log(dataDateObject)
        return dataDateObject >= new Date(startDate) && dataDateObject <= new Date(endDate);
    });

    console.log(filteredData.map((data) => data.date))
    console.log(new Date(startDate))
    console.log(new Date(endDate))

    setUserData({
      labels: filteredData.map((data) => data.date),
      datasets: [{
        label: "RazinaVode",
        data: filteredData.map((data) => data.level),
      }]
    });
  };

  const resetData = () => {
    setUserData(defaultUserData);
    setStartDate("2023-12-02");
    setEndDate("2023-12-05");
  };

  return (
    <div>
      <div className='diagram'>
        <DaysChart chartData={userData}/>
      </div>
      <div className='filters'>
      Start: <input
        id="start"
        type="date"
        min="2023-12-01"
        max="2023-12-03"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      End: <input
        id="end"
        type="date"
        min="2023-12-04"
        max="2023-12-07"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={filterData}>Filter</button>
      <button onClick={resetData}>Reset</button>
      </div>
    </div>
  );
}
