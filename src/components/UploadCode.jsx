import React, { useState, useEffect } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import Dropzone from "react-dropzone";
import "./UploadCode.css";

function UploadCode() {
  const [files, setFiles] = useState(null);
  const [filesUploaded, toggleFilesUploaded] = useState(false);

  const onDrop = (acceptedFiles, rejectedFiles, event) => {
    console.log("event", event);
    setFiles(acceptedFiles);
    toggleFilesUploaded(true);
    console.log("files", files);
  };

  //   useEffect(() => {
  //     const uploader = document.getElementById("uploader");
  //     document.addEventListener(uploader, "")
  //   });

  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 2: Upload Your Code" />
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isFileDialogActive, isFocused }) => {
          return (
            <div className="upload-file mx-auto mt-4" {...getRootProps()}>
              <input
                {...getInputProps()}
                directory=""
                webkitdirectory=""
                type="file"
                id="uploader"
              />
              <div className="d-flex justify-content-center p-3">
                {isFocused && !filesUploaded
                  ? "Processing..."
                  : filesUploaded
                  ? "Files Selected"
                  : "Click to select directory"}
              </div>
            </div>
          );
        }}
      </Dropzone>
      <div className="allow-notice mx-auto mt-4">
        Allow a minute for larger directories to load
      </div>
    </div>
  );
}

export default UploadCode;
