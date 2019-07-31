import React from "react";
import Header from "./components/Header";
import Base from "./components/Base";
import "./App.css";

/* 
Noun project credits
logo: Arthur Shlain 
 */

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
