import React, { useState } from "react";
import Steps from "./Steps";
import Domain from "./Domain";
import UploadCode from "./UploadCode";

const DOMAINS = ["perseus", "nemesis", "beanbag"];

function Base() {
  const [step, setStep] = useState(-1);
  const [activeAddress, setActiveAddress] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [arweaveTxId, setArweaveTxId] = useState("")
  const [subdomainName, setSubdomainName] = useState("");
  const [domainName, setDomainName] = useState(DOMAINS[0]);

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
            arweaveTxId={arweaveTxId}
            setArweaveTxId={setArweaveTxId}
          />
        );

      case 1:
        return (
          <Domain
            ipfsHash={ipfsHash}
            setStep={setStep}
            activeAddress={activeAddress}
            subdomainName={subdomainName}
            setSubdomainName={setSubdomainName}
            domainName={domainName}
            setDomainName={setDomainName}
            domains={DOMAINS}
          />
        );

      default:
        return null;
    }
  };

  return <div className="mt-5 mx-auto">{getView()}</div>;
}

export default Base;
