import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Calibration from "./Calibration";

interface Props {
  manageNotifications: any;
  notificationPermission: string;
}

function TitleBar({ manageNotifications, notificationPermission }: Props) {
  const [showCalibration, setShowCalibration] = useState(false);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="text-light">
        <Container>
          <Navbar.Brand href="/" className="text-light">
            <img
              alt=""
              src="../../public/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            AquaObserver
          </Navbar.Brand>
          <Nav className="me-auto text-light">
            <Nav.Link className="text-light" href="/history">
              Povijest mjerenja
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto text-light">
            <Nav.Link>
              <i
                className={
                  notificationPermission === "granted"
                    ? "fa-sharp fa-solid fa-bell text-light"
                    : "fa-solid fa-bell-slash text-light"
                }
                title={
                  notificationPermission === "granted"
                    ? "Obavijesti su uključene"
                    : "Uključi obavijesti"
                }
                onClick={() => manageNotifications()}
              ></i>
            </Nav.Link>
            <Nav.Link onClick={() => setShowCalibration(true)}>
              <i
                className="fa-solid fa-bucket text-light"
                title="Kalibracija"
              ></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {showCalibration && (
        <Calibration
          show={showCalibration}
          onHide={() => setShowCalibration(false)}
        />
      )}
    </>
  );
}

export default TitleBar;
