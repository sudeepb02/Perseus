import React from "react";
import Header from "./components/Header";
import Base from "./components/Base";
import "./App.css";
import Arweave from "arweave/web";
import { SubdomainContractMetamask } from "./services/web3";
/* 
Noun project credits
logo: Arthur Shlain 
 */
const arwId2 = "eaktvKypW-Xbjsr81DRAnakPEe15h7TVGyDux8Syh2M"

// const getContract = async() => {
//   const label = "beanbag"
//   const retVal = await getDomain(label);
//   console.log("label retval", retVal)
// }

// getContract()

const arweave = Arweave.init({
  host: "arweave.net",
  port: "80"
});

// arweave.transactions.get(arwId).then(transaction => {
//   console.log("arw-tx", transaction)
// })


function App() {
  return (
    <div className="App">
      <div className="content mx-auto d-flex flex-column">
        <Header />
        <Base />
      </div>
    </div>
  );
}

export default App;
