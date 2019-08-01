import React from "react";
import "./common.css";

function Button({ text, onClick, className }) {
  return (
    <div
      className={`main-button mt-4 mx-auto d-flex justify-content-center ${className}`}
      onClick={onClick}
    >
      <div className="my-auto">{text}</div>
    </div>
  );
}

export default Button;