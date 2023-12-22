import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

interface Props {
  manageNotifications: any;
  notificationPermission: string;
}

function TitleBar({ manageNotifications, notificationPermission }: Props) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="../../public/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          AquaObserver
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/history">Povijest mjerenja</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link>
            <i
              className={
                notificationPermission === "granted"
                  ? "fa-sharp fa-solid fa-bell"
                  : "fa-solid fa-bell-slash"
              }
              title={
                notificationPermission === "granted"
                  ? "Obavijesti su uključene"
                  : "Uključi obavijesti"
              }
              onClick={() => manageNotifications()}
            ></i>
          </Nav.Link>
          <Nav.Link href="/calibration">
            <i className="fa-solid fa-bucket" title="Kalibracija"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TitleBar;
