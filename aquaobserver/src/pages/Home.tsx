import { useState } from "react";
import bucket from "../assets/bucket.png";

import { useNavigate } from "react-router-dom";
import ChangeCritLevel from "../components/ChangeCritLevel";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [criticalLevel, setCriticalLevel] = useState(20);
  const navigate = useNavigate();
  const handleClickHistory = () => {
    navigate("/history");
  };

  const handleCritical = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div className="h1 ">AquaObserver</div>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <img src={bucket} alt="" className="col-6" />
              <div className="col-6 ">
                <div className="card">Datum</div>
                <div className="card">Postotak</div>
                <div className="card">Količina</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="btn btn-primary my-3" onClick={handleClickHistory}>
              Povijest Mjerenja
            </div>
            <div className="btn btn-success" onClick={handleCritical}>
              Promijeni kritičnu razinu
            </div>
          </div>
        </div>
        <ChangeCritLevel
          showModal={showModal}
          handleClose={handleCritical}
          current={criticalLevel}
        />
      </div>
    </>
  );
}

export default Home;
