import React, { useState, useEffect } from "react";
import logo from "../../assets/planet.png";
import "./common.css";

function Loading() {
  return <img src={logo} className="loading-logo mx-auto" alt="logo" />;
}

export default Loading;
