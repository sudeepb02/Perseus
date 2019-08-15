import React, { useState, useEffect } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Dropzone from "react-dropzone";
import Arweave from "arweave/web";
import jwk from "../arweave-keyfile.json";
import { ethers } from "ethers";
import "./UploadCode.css";

import { web3, portis } from "../services/portis";
import EthRegistrarSubdomainRegistrar from "../contracts/EthRegistrarSubdomainRegistrar.json";

// export const ersrInstance = new web3.eth.Contract(
// export const ersrInstance = web3.eth.contract(
//   EthRegistrarSubdomainRegistrar.abi
// ).at("0x1F495557885C90f13ED48483A772Ef096be6B32c")
// console.log("EthRegistrarSubdomainRegistrar.abi", EthRegistrarSubdomainRegistrar.abi)

// export const ersrInstance = new web3.eth.Contract(
//   EthRegistrarSubdomainRegistrar.abi,
//   "0x1F495557885C90f13ED48483A772Ef096be6B32c"
//   // portis.provider
//   // web3.currentProvider
// );

const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

// ersrInstance.setProvider(web3.currentProvider);

const TYPES = ["Single", "Directory"];

function UploadCode({ setIpfsHash, ipfsHash, setStep }) {
  const [files, setFiles] = useState(null);
  const [filesUploaded, toggleFilesUploaded] = useState(false);
  const [activeType, setActiveType] = useState(TYPES[0]);
  const [transactionId, setTransactionId] = useState("");
  const [ipfsReturn, receiveIpfsReturn] = useState(null); // delete?
  const [nextStep, readyNextStep] = useState(false);
  const [uploadInProgress, toggleUploadInProgress] = useState(false);

  const onDrop = (acceptedFiles, rejectedFiles, event) => {
    toggleFilesUploaded(true);

    const file = event.target.files[0];
    const r = new FileReader();
    r.onload = readSuccess;

    function readSuccess(evt) {
      setFiles(evt.target.result);
    }
    r.readAsText(file);
  };

  const upload = async () => {
    toggleUploadInProgress(true);
    const arweave = Arweave.init({
      host: "arweave.net",
      port: "80"
    });

    arweave.wallets.jwkToAddress(jwk).then(address => {
      // console.log(address);
    });

    arweave.wallets
      .getBalance("a2tBnI_YOYnXg1IWabrfTb8nGzPQA67CrvATDym0NYM")
      .then(balance => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(balance);
        // console.log("balance", ar);
      });

    let transaction = await arweave.createTransaction(
      {
        data: files
      },
      jwk
    );

    transaction.addTag("Content-Type", "text/html");
    await arweave.transactions.sign(transaction, jwk);

    const response = await arweave.transactions.post(transaction);
    let txId = JSON.parse(response.config.data)["id"];
    setTransactionId(txId);

    await addToIpfs(txId);
  };

  const receiveFile = () => {
    readyNextStep(true);
    toggleUploadInProgress(false);
  };

  useEffect(() => {
    if (ipfsHash) {
      readyNextStep(true);
      toggleUploadInProgress(false);
      console.log("in useeffect ipfs hash", ipfsHash);
    }
  }, [ipfsHash]);

  const addToIpfs = async hash => {
    const htmlfile = hash =>
      `<!DOCTYPE HTML>< html lang = "en-US" ><head> <meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=https://arweave.net/${hash}"><script type="text/javascript">window.location.href = "https://arweave.net/${hash}"</script><title>Page Redirection</title></head><body>If you are not redirected automatically, follow this <a href='https://arweave.net/${hash}'>Click if not automatically redirected</a>.</body></html>`;

    const file = htmlfile(hash);
    const buffer = Buffer.from(file, "utf8");
    await ipfs.add(buffer, (err, ipfsHash) => {
      setIpfsHash(ipfsHash);
    });

    return true;
  };

  // const configureDomain = async () => {
  //   const configReturn = await ersrInstance.methods
  //     .configureDomainFor(
  //       "arweave-tester",
  //       0,
  //       0,
  //       "0x1F495557885C90f13ED48483A772Ef096be6B32c",
  //       "0xd01aE9C9Da06bcb259803341A61aF7a516645a32"
  //     )
  //     .call();
  //   console.log("config return", configReturn);
  // };

  // const registerSubdomain = async ipfsHash => {
  //   const dom = "arweave-tester";
  //   const subD = "michael";

  //   const referrerAddress = "0xd01aE9C9Da06bcb259803341A61aF7a516645a32";
  //   const resolverAddress = "0x1B21F0Caf49f4438187f1078cbc0444ebC1D4033";

  //   const contentHash = sha3(ipfsHash);
  //   console.log("contenthash in register subdomain", contentHash);

  //   // const subdomainReturn = await ersrInstance.methods.register(
  //   //   shas3('0x' + dom), //label
  //   //   subD, //subdomain
  //   //   activeAddress, //_subdomainOwner
  //   //   referrerAddress, //referrer
  //   //   resolverAddress, //resolver
  //   //   contentHash
  //   // )
  //   // console.log("subdomainreturn", subdomainReturn)
  // };

  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 1: Upload Your Code" />
      <div className="d-flex flex-column file-type mx-auto">
        <div
          className={`type-select py-2 px-3 my-4 ${
            activeType === TYPES[0] ? "active-type" : ""
          }`}
          onClick={() => setActiveType(TYPES[0])}
        >
          Upload Single File
        </div>
        <div
          className={`text-muted type-select py-2 px-3 ${
            activeType === TYPES[1] ? "active-type" : ""
          }`}
        >
          Upload Directory *coming soon
        </div>
      </div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isFileDialogActive, isFocused }) => {
          const getInput = () => {
            if (activeType === TYPES[1]) {
              return <input {...getInputProps()} type="file" id="uploader" />;
            } else {
              return <input {...getInputProps()} type="file" id="uploader" />;
            }
          };

          const selectText =
            activeType === TYPES[0]
              ? "Click to select file"
              : "Click to select directory root";

          return (
            <div className="upload-file mx-auto mt-4" {...getRootProps()}>
              {getInput()}
              <div className="d-flex justify-content-center p-3">
                {isFocused && !filesUploaded
                  ? "Processing..."
                  : filesUploaded
                  ? "Files Selected"
                  : selectText}
              </div>
            </div>
          );
        }}
      </Dropzone>
      {!uploadInProgress ? (
        nextStep ? (
          <Button onClick={() => setStep(1)} text="Next" />
        ) : (
          <Button onClick={upload} disabled={!files} text="Upload" />
        )
      ) : (
        <div className="mx-auto mt-4">Uploading...</div>
      )}
    </div>
  );
}

export default UploadCode;
