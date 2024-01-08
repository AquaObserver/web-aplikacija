import React, { useState } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";

function Calibration() {
  const [isLoading, setIsLoading] = useState(false);

  function handleCalibration() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <>
      <Card className="calibration mx-auto my-5">
        <Card.Header>Kalibracija</Card.Header>
        <Card.Body className="d-flex flex-column">
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
        </Card.Body>
      </Card>
    </>
  );
}

export default Calibration;
