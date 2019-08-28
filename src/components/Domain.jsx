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

function Domain({
  activeAddress,
  ipfsHash,
  subdomainName,
  setSubdomainName,
  domainName,
  setDomainName,
  domains
}) {
  const [txProcessing, toggleTxProcessing] = useState(false);
  const [flowComplete, toggleFlowComplete] = useState(false);
  const [showDropdown, toggleShowDropdown] = useState(false);

  const register = async () => {
    const dom = domainName;
    const subD = subdomainName;

    const referrerAddress = "0x6c13cacf07bac2a5abb6a4d12527488a6a64b321"; 
    const resolverAddress = "0x9C4c3B509e47a298544d0fD0591B47550845e903";

    const contentHash = "0x" + contentHashLib.fromIpfs(ipfsHash);

    watchForRegistration();
    toggleTxProcessing(true);
    console.log(
    // await registerSubdomainMetamask(
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
      console.log("event-new-registration", evt);
      toggleTxProcessing(false);
      toggleFlowComplete(true);
    });
  };

  function DropdownItem({ text }) {
    return <div onClick={() => {
      toggleShowDropdown(false);
      setDomainName(text);
    }} className="dropdown-item p-1 d-flex justify-content-end">{text}</div>;
  }

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
        <div className="subdomain-selector position-relative">
          <div className="d-flex position-relative">
            <div className="url-text">.{domainName}</div>
            <div className="position-relative">
              <div
                className="dropdown-arrow position-absolute"
                onClick={() => toggleShowDropdown(!showDropdown)}
              />
            </div>
          </div>
          {showDropdown && (
            <div className="subdomain-dropdown position-absolute d-flex flex-column w-100">
              {domains.map((d, i) => {
                return <DropdownItem text={d} key={i} />;
              })}
            </div>
          )}
        </div>
        <div className="url-text ml-4">.eth</div>
      </div>
      {txProcessing ? (
        <div className="mt-5 mx-auto">
          <Loading />
        </div>
      ) : flowComplete ? (
        <div className="mt-5 mx-auto d-flex flex-column">
          <div className="domain-info mx-auto">
            Congrats! Your site will be deployed shortly at
          </div>
          <a
            target="_blank"
            href={`https://${subdomainName}.${domainName}.eth`}
            className="domain-link mt-1 mx-auto"
          >
            {`${subdomainName}.beanbag.eth`}
          </a>
          <div className="domain-info mt-1 mx-auto">
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
