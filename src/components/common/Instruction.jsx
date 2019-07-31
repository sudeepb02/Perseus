import React from "react";
import "./common.css";

function Instruction({ text }) {
  return (
    <div className="instruction d-flex justify-content-start mx-auto">
      <div>{text}</div>
    </div>
  );
}

export default Instruction;
