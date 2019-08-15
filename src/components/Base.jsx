import React, { useState } from "react";
import Steps from "./Steps";
import Domain from "./Domain";
import UploadCode from "./UploadCode";

function Base() {
  const [step, setStep] = useState(1);
  // const [step, setStep] = useState(-1);
  const [activeAddress, setActiveAddress] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const getView = () => {
    switch (step) {
      case -1:
        return <Steps setStep={setStep} setActiveAddress={setActiveAddress} />;

      case 0:
        return (
          <UploadCode
            setStep={setStep}
            setIpfsHash={setIpfsHash}
            ipfsHash={ipfsHash}
            activeAddress={activeAddress}
          />
        );

      case 1:
        return (
          <Domain
            ipfsHash={ipfsHash}
            setStep={setStep}
            activeAddress={activeAddress}
          />
        );

      default:
        return null;
    }
  };

  return <div className="mt-5 mx-auto">{getView()}</div>;
}

export default Base;
