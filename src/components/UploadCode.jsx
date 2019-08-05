import React, { useState, useEffect } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Dropzone from "react-dropzone";
import "./UploadCode.css";

const TYPES = ["Single", "Directory"];

function UploadCode() {
  const [files, setFiles] = useState(null);
  const [filesUploaded, toggleFilesUploaded] = useState(false);
  const [activeType, setActiveType] = useState(TYPES[0]);

  const onDrop = (acceptedFiles, rejectedFiles, event) => {
    console.log("event", event);
    setFiles(acceptedFiles);
    toggleFilesUploaded(true);
  };

  const deploy = () => {
    console.log("files", files);
  };

  //   useEffect(() => {
  //     const uploader = document.getElementById("uploader");
  //     document.addEventListener(uploader, "")
  //   });

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
                  directory=""
                  webkitdirectory=""
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
              : "Click to select directory";

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
    </div>
  );
}

export default UploadCode;
