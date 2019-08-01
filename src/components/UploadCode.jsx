import React, { useState } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";

function UploadCode() {
  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 2: Upload Your Code" />
    </div>
  );
}

export default UploadCode;
