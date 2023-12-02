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

  const handleShowCritical = () => {
    setShowModal((prev) => !prev);
  };

  const handleNewCritical = () => {};

  return (
    <>
      <nav className="navbar navbar-dark bg-dark app-title">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img
              src="/logo.png"
              alt=""
              height="24"
              className="d-inline-block align-text-top"
            />
            AquaObserver
          </a>
        </div>
      </nav>
      <div className="center">
        <Bucket
          currentLevel={currentLevel}
          criticalLevel={criticalLevel}
        ></Bucket>
      </div>
      <div className="card-body text-center">{currentAmount} ml</div>
      <div className="card-body text-center">{date.toLocaleDateString()}</div>
      <div className="center">
        <div className="btn btn-primary m-3" onClick={handleClickHistory}>
          Povijest Mjerenja
        </div>
        <div className="btn btn-success m-3" onClick={handleShowCritical}>
          Promijeni kritičnu razinu
        </div>
      </div>
      <ChangeCritLevel
        showModal={showModal}
        handleClose={handleShowCritical}
        handleSubmit={handleNewCritical}
        current={criticalLevel}
      />
    </>
  );
}

export default Home;
