import React from "react";
import Button from "./common/Button";
import { web3 } from "../services/web3"; 
import "./Steps.css";

const Step = text => <div className="step-text my-3">{text}</div>;

function Steps({ setStep, setActiveAddress }) {
  
  const login = async() => {
    if(window.ethereum){
      await window.ethereum.enable();
      setStep(0);
      web3.eth.getAccounts((error, accounts) => {
        setActiveAddress(accounts[0])
      });
    }
  }
  
  return (
    <div className="d-flex flex-column mt-2">
      <div className="steps mx-auto mb-2">Steps To Deploy</div>
      {Step("1) Upload Your Code")}
      {Step("2) Choose an ENS Domain")}
      {Step("3) Deploy")}

      <Button text="Get Started" onClick={login} />
    </div>
  );
}

export default Steps;
