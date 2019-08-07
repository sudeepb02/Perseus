import React, { useState, useEffect } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Dropzone from "react-dropzone";
import Arweave from "arweave/web";
import jwk from "../arweave-keyfile.json";
import "./UploadCode.css";

const TYPES = ["Single", "Directory"];

function UploadCode() {
  const [files, setFiles] = useState(null);
  const [filesUploaded, toggleFilesUploaded] = useState(false);
  const [activeType, setActiveType] = useState(TYPES[0]);
  const [transactionId, setTransactionId] = useState("");

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

  const deploy = async () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: "80"
    });

    arweave.wallets.jwkToAddress(jwk).then(address => {
      console.log(address);
    });

    arweave.wallets
      .getBalance("a2tBnI_YOYnXg1IWabrfTb8nGzPQA67CrvATDym0NYM")
      .then(balance => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(balance);

        console.log("balance", ar);
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
  };

  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 2: Upload Your Code" />
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
          className={`type-select py-2 px-3 ${
            activeType === TYPES[1] ? "active-type" : ""
          }`}
          onClick={() => setActiveType(TYPES[1])}
        >
          Upload Directory
        </div>
      </div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isFileDialogActive, isFocused }) => {
          const getInput = () => {
            if (activeType === TYPES[1]) {
              return (
                <input
                  {...getInputProps()}
                  type="file"
                  id="uploader"
                />
              );
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
      <div className="allow-notice mx-auto mt-4">
        Allow a minute for larger directories to load
      </div>

      <Button onClick={deploy} disabled={!files} text="Deploy" />
      {transactionId && (
        <div className="mt-3 mx-auto">
          Deployed{" "}
          <a href={`https://arweave.net/${transactionId}`}>
            right here shortly{" "}
          </a>
        </div>
      )}
    </div>
  );
}

export default UploadCode;
