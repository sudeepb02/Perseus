import React, { useState } from "react";
import Steps from "./Steps";
import Domain from "./Domain";
import UploadCode from "./UploadCode";

function Base() {
  const [step, setStep] = useState(-1);

  const getView = () => {
    switch (step) {
      case -1:
        return <Steps setStep={setStep} />;

      case 0:
        return <Domain setStep={setStep} />;
      
      case 1:
        return <UploadCode />;

      default:
        return null;
    }
  };

  return <div className="mt-5 mx-auto">{getView()}</div>;
}

export default Base;
