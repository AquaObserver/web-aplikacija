import { useState } from "react";

import { useNavigate } from "react-router-dom";
import ChangeCritLevel from "../components/ChangeCritLevel";
import Bucket from "../components/Bucket";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [criticalLevel, setCriticalLevel] = useState(20);
  const [date, setDate] = useState(new Date());
  const [currentLevel, setCurrentLevel] = useState(75);
  const [currentAmount, setCurrentAmount] = useState(500);

  const navigate = useNavigate();
  const handleClickHistory = () => {
    navigate("/history");
  };

  const handleCritical = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <header className="text-center app-title">AquaObserver</header>
      <div className="center">
        <Bucket
          currentLevel={currentLevel}
          criticalLevel={criticalLevel}
        ></Bucket>
      </div>
      <div className="card">{currentAmount} ml</div>
      <div className="card">{date.toLocaleDateString()}</div>
      <div className="btn btn-primary m-3" onClick={handleClickHistory}>
        Povijest Mjerenja
      </div>
      <div className="btn btn-success m-3" onClick={handleCritical}>
        Promijeni kritičnu razinu
      </div>
      <ChangeCritLevel
        showModal={showModal}
        handleClose={handleCritical}
        current={criticalLevel}
      />
    </>
  );
}

export default Home;
