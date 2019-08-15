import React, { useState } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import { web3 } from "../services/web3";
import "./Domain.css";

import { registerSubdomain } from "../services/web3";

const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

function Domain({ setStep, activeAddress, ipfsHash }) {
  const [domainName, setDomainName] = useState("");


  let testHash = "QmYXf7cKsRH2NrQkrTxdK6STT18vdEZ7JzLSHqQLJaDsYw"

  const register = async() => {
    const dom = "beanbag";
    const subD = "michael123";
    const from = activeAddress
    
    const referrerAddress = "0x6c13cacf07bac2a5abb6a4d12527488a6a64b321";
    const resolverAddress = "0x9C4c3B509e47a298544d0fD0591B47550845e903";
    
    testHash = web3.utils.fromAscii(`ipfs://${testHash}`)
    // const contentHash = web3.utils.fromAscii(`ipfs://${ipfsHash}`)

    await registerSubdomain(
      dom,
      subD, //subdomain
      referrerAddress, //subdomain owner tester
      // activeAddress, //_subdomainOwner
      referrerAddress, //referrer
      resolverAddress, //resolver
      testHash,
      // contentHash,
      // from
    )
  }

  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 2: Choose a Domain" />
      <div className="d-flex">
        <input
          value={domainName}
          onChange={e => setDomainName(e.target.value)}
          className="domain-input mt-3 p-1"
          autoFocus={true}
        />
        <div className="url-text">.perseusweb.eth</div>
      </div>
      <Button className="mt-5" text="Deploy" onClick={register} />
    </div>
  );
}

export default Domain;
