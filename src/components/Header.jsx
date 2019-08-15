import React from "react";
import logo from "../assets/planet.png";
import wallet from "../assets/wallet.png";
import { portis } from "../services/web3";
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
      <div className="position-relative">
        <div className="position-absolute portis d-flex" onClick={() => portis.showPortis()}>
          <img src={wallet} className="img-fluid wallet" />
          <div className="ml-1 portis-text">
            Portis
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Header;
