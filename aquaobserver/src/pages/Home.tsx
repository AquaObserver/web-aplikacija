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

async function getCurrentAmount() {
  let requestDate = { date: "2023-12-06" }; //getCurrentDate() ali

  // Request options
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestDate),
  };

  const response = await fetch("/api/dailyLatest/", requestOptions);
  const data = await response.json();
  return Number(data.waterLevel);
}

async function getThreshold() {
  let userId = 0; // hardcoded for now, will change

  const response = await fetch(`/api/userThreshold/${userId}`);
  const data = await response.json();
  return Number(data.threshold);
}

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState(1000);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    getCurrentAmount().then((amount) => {
      setCurrentAmount(amount);
      setCurrentLevel((amount / totalAmount) * 100);
    });
    getThreshold().then((threshold) => {
      setThreshold(threshold);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [threshold]);

  async function putThreshold(thresh: Number) {
    setLoading(true);
    let userId = 0;

    let requestData = {
      userId: userId,
      thresholdLevel: thresh,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    let apiUrl = `/api/userThreshold/${userId}`;

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    setLoading(false);
  }

  Notification.requestPermission().then((permission) =>
    console.log(permission)
  );

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
                currentLevel={currentLevel}
                threshold={Number(threshold)}
              ></Bucket>
            </div>
            <div className="card-body text-center">{currentAmount} ml</div>
            <div className="card-body text-center">
              {date.toLocaleDateString()}
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
              showModal={showModal}
              handleClose={handleShowCritical}
              changeThreshold={putThreshold}
              current={Number(threshold)}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
