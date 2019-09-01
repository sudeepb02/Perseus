import React, { useState, useEffect } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Dropzone from "react-dropzone";
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

    await addToIpfs();
  };

  useEffect(() => {
    if (ipfsHash) {
      readyNextStep(true);
      toggleUploadInProgress(false);
    }
  }, [ipfsHash]);

  const addToIpfs = async() => {
    const file = files;
    console.log("file", file)
    const buffer = Buffer.from(file, "utf8");
    await ipfs.add(buffer, (err, ipfsHashResult) => {
      setIpfsHash(ipfsHashResult[0].path);
      console.log("upload code - ipfs hash", ipfsHashResult[0].path);
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
          <Button onClick={upload} text="Upload" />
          // <Button onClick={upload} disabled={!files} text="Upload" />
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
