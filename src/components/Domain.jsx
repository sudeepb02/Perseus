import React, { useState } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Loading from "./common/Loading";
import contentHashLib from "content-hash";
import {
  registerSubdomainMetamask,
  SubdomainContractMetamask
} from "../services/web3";
import "./Domain.css";

const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

function Domain({ activeAddress, ipfsHash, subdomainName, setSubdomainName }) {
  const [txProcessing, toggleTxProcessing] = useState(false);
  const [flowComplete, toggleFlowComplete] = useState(false);

  const register = async () => {
    const dom = "beanbag";
    const subD = subdomainName;

    const referrerAddress = "0x6c13cacf07bac2a5abb6a4d12527488a6a64b321";//beanbag
    const resolverAddress = "0x9C4c3B509e47a298544d0fD0591B47550845e903"; 

    const contentHash = "0x" + contentHashLib.fromIpfs(ipfsHash);

    watchForRegistration();
    toggleTxProcessing(true);
    await registerSubdomainMetamask(
      dom,
      subD, //subdomain
      activeAddress, //_subdomainOwner
      referrerAddress, //referrer
      resolverAddress, //resolver
      contentHash
    );
  };

  const watchForRegistration = async () => {
    const contr = await SubdomainContractMetamask();
    contr.NewRegistration().on("data", evt => {
      console.log("event-truffle-contr", evt);
      toggleTxProcessing(false);
      toggleFlowComplete(true);
    });
  };

  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 2: Choose a Domain" />
      <div className="d-flex">
        <input
          value={subdomainName}
          onChange={e => setSubdomainName(e.target.value)}
          className="domain-input mt-3 p-1"
          autoFocus={true}
        />
        <div className="url-text">.beanbag.eth</div>
      </div>
      {txProcessing ? (
        <div className="mt-5 mx-auto">
          <Loading />
        </div>
      ) : flowComplete ? (
        <div className="mt-5 mx-auto d-flex flex column">
          <div className="domain-info">
            Congrats! Your site will be deployed shortly at
          </div>
          <a
            target="_blank"
            href={`https://${subdomainName}.beanbag.eth`}
            className="domain-link mt-1"
          >
            {`${subdomainName}.beanbag.eth`}
          </a>
          <div className="domain-info mt-1">
            Be sure to allow 20-30 minutes for full deployment
          </div>
        </div>
      ) : (
        <Button className="mt-5" text="Deploy" onClick={register} />
      )}
    </div>
  );
}

export default Domain;
