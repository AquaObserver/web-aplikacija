import React, { useState, useEffect } from "react";
import DaysChart from "../components/DaysChart";
import "../index.css";

interface ReadingData {
  date: string;
  meanValue: number;
}

interface UserData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: "rgb(53, 162, 235)";
    backgroundColor: "rgba(53, 162, 235, 0.5)";
    borderWidth: 3;
  }[];
}

export default function History() {
  const currentDate = new Date().toISOString().split("T")[0];

  console.log("danasnji " + currentDate)

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 6);
  const maxStartDate = threeDaysAgo.toISOString().split("T")[0];

  const createDefaultUserData = async (
    startDate: string,
    endDate: string
  ): Promise<UserData> => {
    try {
      const response = await fetch(
        `/api/readingsRange/${startDate}:${endDate}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any-value",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch default data");
      }

      const jsonData = (await response.json()) as { data: ReadingData[] };
      const labels = jsonData.data.map((item) => item.date);
      const levels = jsonData.data.map((item) => item.meanValue);

      return {
        labels,
        datasets: [
          {
            label: "Razina vode",
            data: levels,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 3,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching default data:", (error as Error).message);
      return {
        labels: [],
        datasets: [
          {
            label: "Razina vode",
            data: [],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 3,
          },
        ],
      };
    }
  };

  const [userData, setUserData] = useState<UserData>({
    labels: [],
    datasets: [
      {
        label: "Razina vode",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 3,
      },
    ],
  });

  const [startDate, setStartDate] = useState<string>(maxStartDate);
  const [endDate, setEndDate] = useState<string>(currentDate);

  useEffect(() => {
    console.log("Defoltni");
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    const defaultData = await createDefaultUserData(maxStartDate, currentDate);
    setUserData(defaultData);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/readingsRange/${startDate}:${endDate}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any-value",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      console.log(startDate);
      console.log(endDate);

      const jsondata = (await response.json()) as { data: ReadingData[] };
      console.log(jsondata.data);

      if (!Array.isArray(jsondata.data)) {
        throw new Error("Received data is not an array");
      }

      const labels = jsondata.data.map((item) => item.date);
      const levels = jsondata.data.map((item) => item.meanValue);

      setUserData({
        labels,
        datasets: [
          {
            label: "Razina vode",
            data: levels,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 3,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
    }
  };

  const resetData = () => {
    setStartDate(maxStartDate);
    setEndDate(currentDate);
    fetchDefaultData();
    console.log(maxStartDate);
    console.log(currentDate);
  };

  return (
    <div>
      <div className="diagram">
        <DaysChart chartData={userData} />
      </div>
      <div className="filters">
        Start:
        <input
          id="start"
          type="date"
          min="2023-11-29"
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
        <button type="button" className="btn btn-dark" onClick={fetchData}>
          Filter
        </button>
        <button type="button" className="btn btn-dark" onClick={resetData}>
          Reset
        </button>
      </div>
    </div>
  );
}
