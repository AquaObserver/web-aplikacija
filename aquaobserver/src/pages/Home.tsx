import { useState, useEffect } from "react";
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
  const response = await fetch("/api/getLatest/");
  const data = await response.json();
  return data;
}

async function getThreshold() {
  const response = await fetch(`/api/userThreshold/`);
  const data = await response.json();
  return Number(data.threshold);
}

async function postThreshold(data: any) {
  try {
    const response = await fetch("/api/userThreshold/", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success: ", result);
  } catch (error) {
    console.error("Error: ", error);
  }
}

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(100);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLevelPercent, setCurrentLevelPercent] = useState(0);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    getLatestReading().then((data) => {
      let level = data.waterLevel;
      setDate(data.tstz);
      setCurrentLevel(level);
      setCurrentLevelPercent((level / totalAmount) * 100);
    });
    getThreshold().then((threshold) => {
      setThreshold(threshold);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [threshold]);

  async function updateThreshold(thresh: Number) {
    setLoading(true);
    let data = {
      thresholdLevel: thresh,
    };
    postThreshold(data);
    setLoading(false);
  }

  const handleShowCritical = () => {
    setShowModal((prev) => !prev);
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
                currentLevel={currentLevelPercent}
                threshold={Number(threshold)}
              ></Bucket>
            </div>
            <div className="card-body text-center">{currentLevel} ml</div>
            <div className="card-body text-center">{date}</div>
            <div className="card-body text-center">
              Kritična razina: {threshold} %
            </div>
            <div className="center">
              <div className="btn btn-success m-3" onClick={handleShowCritical}>
                Promijeni kritičnu razinu
              </div>
            </div>
            <ChangeCritLevel
              showModal={showModal}
              handleClose={handleShowCritical}
              changeThreshold={updateThreshold}
              current={Number(threshold)}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
