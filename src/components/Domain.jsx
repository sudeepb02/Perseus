import React, { useState } from "react";
import Instruction from "./common/Instruction";
import Button from "./common/Button";
import "./Domain.css";

function Domain({ setStep }) {
  const [domainName, setDomainName] = useState("");

  return (
    <div className="d-flex flex-column domain mt-3 animated fadeIn">
      <Instruction text="Step 1: Choose a Domain" />
      <div className="d-flex">
        <input
          value={domainName}
          onChange={e => setDomainName(e.target.value)}
          className="domain-input mt-3 p-1"
          autoFocus={true}
        />
        <div className="url-text">.perseus.eth</div>
      </div>
      <Button className="mt-5" text="Next" onClick={() => setStep(1)} />
    </div>
  );
}

export default Domain;
