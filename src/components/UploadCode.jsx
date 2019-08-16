import React, { useState, useEffect } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Dropzone from "react-dropzone";
import Arweave from "arweave/web";
import jwk from "../arweave-keyfile.json";
import Loading from "./common/Loading";
import "./UploadCode.css";

const TYPES = ["Single", "Directory"];

const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

function UploadCode({
  setIpfsHash,
  ipfsHash,
  setStep,
  setArweaveTxId,
  arweaveTxId
}) {
  const [files, setFiles] = useState(null);
  const [filesUploaded, toggleFilesUploaded] = useState(false);
  const [activeType, setActiveType] = useState(TYPES[0]);
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
      console.log("arweave address", address);
    });

    arweave.wallets
      .getBalance("a2tBnI_YOYnXg1IWabrfTb8nGzPQA67CrvATDym0NYM")
      .then(balance => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(balance);

        console.log("arweave balance", ar);
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
    console.log("arweave tx-id", txId);
    setArweaveTxId(txId);

    await addToIpfs(txId);
  };

  useEffect(() => {
    if (ipfsHash) {
      readyNextStep(true);
      toggleUploadInProgress(false);
    }
  }, [ipfsHash]);

  const addToIpfs = async hash => {
    const htmlfile = hash =>
      `<!DOCTYPE HTML><head> <meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=https://arweave.net/${hash}"><script type="text/javascript">window.location.href = "https://arweave.net/${hash}"</script><title>Page Redirection</title></head><body>If you are not redirected automatically, follow this <a href='https://arweave.net/${hash}'>Click if not automatically redirected</a>.</body></html>`;

    const file = htmlfile(hash);
    const buffer = Buffer.from(file, "utf8");
    await ipfs.add(buffer, (err, ipfsHash) => {
      setIpfsHash(ipfsHash[0].path);
      console.log("upload code - ipfs hash", ipfsHash[0].path);
    });

    return true;
  };

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
          Upload Single HTML File
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
        <div className="mx-auto mt-4">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default UploadCode;
