import React from "react";
import Header from "./components/Header";
import Base from "./components/Base";
import "./App.css";

/* 
Noun project credits
logo: Arthur Shlain 
 */

const hash = "sudeepb02"
const htmlfile = (hash) => `<!DOCTYPE HTML>< html lang = "en-US" ><head> <meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=https://github.com/${hash}"><script type="text/javascript">window.location.href = "https://github.com/${hash}"</script><title>Page Redirection</title></head><body>If you are not redirected automatically, follow this <a href='https://github.com/${hash}'>link to example</a>.</body></html>`


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
