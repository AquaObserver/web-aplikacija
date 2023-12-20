import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

interface Props {
  manageNotifications: any;
}

function TitleBar({ manageNotifications }: Props) {
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
              className="fa-sharp fa-solid fa-bell"
              onClick={() => manageNotifications()}
            ></i>
          </Nav.Link>
          <Nav.Link href="/calibration">
            <i className="fa-solid fa-bucket"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    // <nav className="navbar navbar-dark bg-dark app-title">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href="/">
    //       <img
    //         src="/logo.png"
    //         alt=""
    //         height="24"
    //         className="d-inline-block align-text-top"
    //       />
    //       AquaObserver
    //     </a>
    //     <div className="navbar-nav">
    //       <a className="nav-item nav-link active" href="/history">
    //         Povijest mjerenja
    //       </a>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default TitleBar;
