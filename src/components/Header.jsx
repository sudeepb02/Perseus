import React from "react";
import logo from "../assets/planet.png";
import "./Header.css";

function Header() {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex mt-3">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="perseus ml-2 my-auto">Perseus</div>
      </div>
      <div className="subheader d-flex">
        <div className="subheader-text">
            Decentralized. Permanent. Interplanetary. Hosting.
        </div>
      </div>
    </div>
  );
}

export default Header;
