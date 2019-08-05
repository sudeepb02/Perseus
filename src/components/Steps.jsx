import React from "react";
import Button from "./common/Button";
import "./Steps.css";
import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('48aa2d1e-41b8-4688-b5a0-416252c5b82e', 'ropsten');
const web3 = new Web3(portis.provider);

const Step = text => <div className="step-text my-3">{text}</div>;

function Steps({ setStep }) {
  
  const loginPortis = () => {
  	setStep(0);
  	web3.eth.getAccounts((error, accounts) => {
  		console.log(accounts);
  	});
  }
  
  return (
    <div className="d-flex flex-column mt-2">
      <div className="steps mx-auto mb-2">Steps To Deploy</div>
      {Step("1) Choose an ENS Domain")}
      {Step("2) Upload Your Code")}
      {Step("3) Deploy")}

      <Button text="Get Started" onClick={loginPortis} />
    </div>
  );
}

export default Steps;
