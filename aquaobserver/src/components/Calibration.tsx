import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Modal, Spinner, Toast } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

async function startCalibration() {
  const response = await fetch("/api/calibrate/", {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "any-value",
    },
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Function has waited for 5 seconds.");
    }, 5000);
  });
}

function Calibration({ show, onHide }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  let calibrationInProgress = false;

  async function handleCalibration() {
    setIsLoading(true);
    calibrationInProgress = true;
    try {
      await startCalibration();
    } finally {
      // Set isLoading to false even if an error occurs during calibration
      calibrationInProgress = false;
      setIsLoading(false);
      setShowAlert(false);
      setShowToast(true);
    }
  }

  function handleClose() {
    if (isLoading) {
      setShowAlert(true);
    } else {
      onHide();
    }
  }

  const handleBeforeUnload = (event: any) => {
    // Perform actions before the component unloads
    if (calibrationInProgress) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>Kalibracija</Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Button
            className="mx-auto"
            onClick={handleCalibration}
            variant="dark"
            disabled={isLoading ? true : false}
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {isLoading ? "Kalibracija u tijeku" : "Započni kalibraciju"}
          </Button>
        </Modal.Body>

        <Alert
          show={showAlert}
          onClose={() => setShowAlert(false)}
          className="m-2"
          variant="danger"
        >
          Molimo pričekajte da se završi kalibracija
        </Alert>

        <Alert
          show={showToast}
          onClose={() => setShowToast(false)}
          className="m-2"
          dismissible
        >
          Kalibracija završena
        </Alert>
      </Modal>
    </>
  );
}

export default Calibration;
