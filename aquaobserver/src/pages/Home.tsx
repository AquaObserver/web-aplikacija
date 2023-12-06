import { useState } from "react";

import { useNavigate } from "react-router-dom";
import ChangeCritLevel from "../components/ChangeCritLevel";
import Bucket from "../components/Bucket";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState(1000);
  const [currentAmount, setCurrentAmount] = useState(500);
  const [currentLevel, setCurrentLevel] = useState(
    (currentAmount / totalAmount) * 100
  );
  const [criticalLevel, setCriticalLevel] = useState(
    localStorage.getItem("critical") ?? "20"
  );

  Notification.requestPermission().then((permission) =>
    console.log(permission)
  );

  const handleShowCritical = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div className="true-center">
        <div className="center">
          <Bucket
            currentLevel={currentLevel}
            criticalLevel={Number(criticalLevel)}
          ></Bucket>
        </div>
        <div className="card-body text-center">{currentAmount} ml</div>
        <div className="card-body text-center">{date.toLocaleDateString()}</div>
        <div className="center">
          <div className="btn btn-success m-3" onClick={handleShowCritical}>
            Promijeni kritičnu razinu
          </div>
        </div>
        <ChangeCritLevel
          showModal={showModal}
          handleClose={handleShowCritical}
          current={Number(criticalLevel)}
        />
      </div>
    </>
  );
}

export default Home;
