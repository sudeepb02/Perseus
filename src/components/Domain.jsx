import React, { useState } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
// import { ersrInstance } from "./UploadCode";
import { web3 } from "../services/portis";
import EthRegistrarSubdomainRegistrar from "../contracts/EthRegistrarSubdomainRegistrar.json";
import "./Domain.css";

export const ersrInstance = new web3.eth.Contract(
  EthRegistrarSubdomainRegistrar.abi,
  "0x1F495557885C90f13ED48483A772Ef096be6B32c",
  web3.currentProvider
);

const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

// ersrInstance.setProvider(web3.currentProvider); 


function Domain({ setStep, activeAddress, ipfsHash }) {
  const [domainName, setDomainName] = useState("");

  const registerSubdomain = async () => {
    const dom = "arweave";
    const subD = "michael";

    const referrerAddress = "0xd01aE9C9Da06bcb259803341A61aF7a516645a32";
    const resolverAddress = "0x1B21F0Caf49f4438187f1078cbc0444ebC1D4033";

    const contentHash = web3.utils.fromAscii(`ipfs://${ipfsHash}`)
    console.log("contenthash in register subdomain", contentHash);

    const subdomainReturn = await ersrInstance.methods.register(
      web3.utils.fromAscii("0x" + dom), //label
      subD, //subdomain
      activeAddress, //_subdomainOwner
      referrerAddress, //referrer
      resolverAddress, //resolver
      contentHash
    ).call()
    console.log("subdomainreturn", subdomainReturn);
  };

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
        <div className="url-text">.perseus.eth</div>
      </div>
      <Button className="mt-5" text="Deploy" onClick={registerSubdomain} />
    </div>
  );
}

export default Domain;
