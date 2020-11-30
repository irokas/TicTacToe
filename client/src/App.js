import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  const [hello, setHello] = useState("No data");

  const callApi = () => {
    fetch("http://localhost:9000/newRoute")
      .then((r) => r.text())
      .then((resp) => {
        setHello(resp);
      });
  };
  useEffect(() => {
    callApi();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{hello}</p>
    </div>
  );
}

export default App;
