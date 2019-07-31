import React, { useState } from "react";
import Instruction from "./common/Instruction";
import "./Domain.css";

function Domain() {
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
        <div className="url-text">.perseus</div>
        <div className="url-text">.eth</div>
      </div>
    </div>
  );
}

export default Domain;
