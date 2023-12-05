import React from "react";
import { useNavigate } from "react-router-dom";

function TitleBar() {
  return (
    <nav className="navbar navbar-dark bg-dark app-title">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/logo.png"
            alt=""
            height="24"
            className="d-inline-block align-text-top"
          />
          AquaObserver
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/history">
            Povijest mjerenja
          </a>
        </div>
      </div>
    </nav>
  );
}

export default TitleBar;
