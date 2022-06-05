import React, { Component } from "react";
import SimpleStorageContract from "./abis/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
      </div>
    );
  }
}

export default App;
