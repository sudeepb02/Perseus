import React from "react";
import "./Steps.css";

const Step = text => <div className="step-text my-3">{text}</div>;

function Steps({ setStep }) {
  return (
    <div className="d-flex flex-column mt-2">
      <div className="steps mx-auto mb-2">Steps To Deploy</div>
      {Step("1) Choose an ENS Domain")}
      {Step("2) Upload Your Code")}
      {Step("3) Deploy")}

      <div className="get-started mt-4 mx-auto d-flex justify-content-center" onClick={() => setStep(0)}>
        <div className="my-auto">
            Get Started
        </div>
      </div>
    </div>
  );
}

export default Steps;
