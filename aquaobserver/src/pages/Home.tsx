import { useState, useEffect } from "react";
import { getNotificationToken } from "../firebase";
import { Toast, Button } from "react-bootstrap";
import ChangeCritLevel from "../components/ChangeCritLevel";
import Bucket from "../components/Bucket";

// returns a formatted current date
function getCurrentDate() {
  let currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

async function getLatestReading() {
  try {
    const response = await fetch("/api/getLatest/", {
      headers: {
        // header koji je potrebno dodati u svaki request s ngroka, vrijednost moze biti bilo kakva
        "ngrok-skip-browser-warning": "any-value",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

async function getThreshold() {
  try {
    const response = await fetch(`/api/userThreshold/`, {
      headers: {
        "ngrok-skip-browser-warning": "any-value",
      },
    });
    const data = await response.json();
    return Number(data.threshold);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

async function postThreshold(data: any) {
  try {
    const response = await fetch("/api/userThreshold/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any-value",
      },
      body: JSON.stringify(data),
    });
    const result = await response.text();
    console.log("Success: ", result);
    return Number(result);
  } catch (error) {
    console.error("Error: ", error);
  }
}

function Home() {
  const [showChangeThreshold, setShowChangeThreshold] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [threshold, setThreshold] = useState<number | undefined>(0);
  const WAIT_S = 120;
  const WAIT_MS = WAIT_S * 1000;

  function loadBucket() {
    setLoading(true);
    getLatestReading().then((data) => {
      let level = data.waterLevel;
      setDate(data.tstz);
      setCurrentLevel(level);
    });
    getThreshold().then((threshold) => {
      setThreshold(threshold);
    });
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  useEffect(() => {
    loadBucket();
    const interval = setInterval(() => {
      loadBucket();
    }, WAIT_MS);

    return () => clearInterval(interval);
  }, []);

  async function updateThreshold(thresh: Number) {
    setLoading(true);
    let data = {
      thresholdLevel: thresh,
    };
    const newThresh = await postThreshold(data);
    setThreshold(newThresh);
    setLoading(false);
  }

  const handleShowCritical = () => {
    setShowChangeThreshold((prev) => !prev);
  };

  return (
    <>
      <div className="true-center">
        {loading ? (
          <div className="center">
            <img src="/spinner.gif" />
          </div>
        ) : (
          <>
            <div className="center">
              <Bucket
                currentLevel={currentLevel}
                threshold={Number(threshold)}
              ></Bucket>
            </div>
            <div className="card-body text-center">
              Zadnje mjerenje: {date.split("T")[1]}
            </div>
            <div className="card-body text-center">
              Kritična razina: {threshold} %
            </div>
            <div className="center">
              <div className="btn btn-success m-3" onClick={handleShowCritical}>
                Promijeni kritičnu razinu
              </div>
            </div>
            <ChangeCritLevel
              showModal={showChangeThreshold}
              handleClose={handleShowCritical}
              updateThreshold={updateThreshold}
              current={Number(threshold)}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
