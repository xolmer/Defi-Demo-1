import React, { Component, useState } from "react";
import NavBar from "./components/NavBar";
import Token from "./abis/Token.json";
import Web3 from "web3";
import "./App.css";

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(account[0]);
    this.setState({
      account: account[0],
      balance: web3.utils.fromWei(balance, "ether"),
    });
    const networkID = await web3.eth.net.getId();
    console.log(networkID);
    // Load contract
    const tokenData = Token.networks[networkID];
    if (tokenData) {
      const tokenContract = new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token: tokenContract });
      let tokenBalance = await tokenContract.methods
        .balanceOf(account[0])
        .call();
      this.setState({
        tokenBalance: web3.utils.fromWei(tokenBalance, "ether"),
      });
    } else {
      window.alert("Token contract not deployed to detected network.");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      token: {},
      reward: {},
      defi: {},
      tokenBalance: "0",
      rewardBalance: "0",
      loading: true,
    };
  }

  render() {
    return (
      <>
        <NavBar
          account={this.state.account}
          balance={this.state.balance}
          tokenBalance={this.state.tokenBalance}
        />
        <div className="text-center">
          <h1>Simple Storage</h1>
        </div>
      </>
    );
  }
}

export default App;
