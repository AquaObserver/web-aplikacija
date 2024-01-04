import React, { useState, useEffect } from "react";
import DaysChart from "../components/DaysChart";
import "../index.css";
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';
import Button from 'react-bootstrap/Button';

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

  //console.log("danasnji " + currentDate)

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
    //console.log("Defoltni");
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    const defaultData = await createDefaultUserData(maxStartDate, currentDate);
    setUserData(defaultData);
  };

  const fetchData = async () => {

    if (new Date(startDate) > new Date(endDate)) {
      //throw new Error("Start date cannot be greater than end date");
      setValidationAlert(true);
    } else {
      setValidationAlert(false);
    }

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
  };

  async function getLatestReading() {
    try {
      const response = await fetch("/api/getLatest/", {
        headers: {
          // header koji je potrebno dodati u svaki request s ngroka, vrijednost moze biti bilo kakva
          "ngrok-skip-browser-warning": "any-value",
        },
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  const [latestReading, setLatestReading] = useState(null);

  useEffect(() => {
    async function fetchLatestReading() {
      const data = await getLatestReading();
      const dateOnly = data.tstz.split("T")[0];
      setLatestReading(dateOnly);
      console.log(dateOnly)
    }

    fetchLatestReading();
  }, []);


  const [open, setOpen] = useState(userData.labels.length === 0);

  useEffect(() => {
    console.log("Prek uvjeta: " + (userData.labels.length === 0))
    if (new Date(startDate) > new Date(endDate)) {
      //throw new Error("Start date cannot be greater than end date");
      setOpen(false);
      setValidationAlert(true);
    } else {
      setOpen(userData.labels.length === 0);
      setValidationAlert(false);
    }
  }, [userData.labels]);

  useEffect(() => {
    console.log("The value of open is: " + open);
  }, [open]);

  const handleCloseAlert = () => {
    setOpen(false);
  };

  const [validationAlert, setValidationAlert] = useState(false);

  const handleCloseValidationAlert = () => {
    setValidationAlert(false);
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
          min="2023-11-29"
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
        {(validationAlert) && (
        <Alert variant={'danger'} onClose={handleCloseValidationAlert} dismissible>
          Neispravan interval!
        </Alert>
      )}
        { open && (
          <Alert variant={'danger'} onClose={handleCloseAlert} dismissible>
            U ovom rasponu ne postoje mjerenja! Posljednje mjerenje: {latestReading}
          </Alert>
        )}
      </div>
    </div>
  );
}
