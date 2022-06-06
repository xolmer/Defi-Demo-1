import React, { Component, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Token from "./abis/Token.json";
import Reward from "./abis/Reward.json";
import DeFi from "./abis/DeFi.json";
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

    //Load token contract
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

    //Load reward contract
    const rewardData = Reward.networks[networkID];
    if (rewardData) {
      const rewardContract = new web3.eth.Contract(
        Reward.abi,
        rewardData.address
      );
      this.setState({ reward: rewardContract });
      let rewardBalance = await rewardContract.methods
        .balanceOf(account[0])
        .call();
      this.setState({
        rewardBalance: web3.utils.fromWei(rewardBalance, "ether"),
      });
    } else {
      window.alert("Reward contract not deployed to detected network.");
    }
    //Load defi contract
    const defi = DeFi.networks[networkID];
    if (defi) {
      const defiContract = new web3.eth.Contract(DeFi.abi, defi.address);
      this.setState({ defi: defiContract });
      let stakingBalance = await defiContract.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({
        stakingBalance: web3.utils.fromWei(stakingBalance, "ether"),
      });
    } else {
      window.alert("Defi contract not deployed to detected network.");
    }
    this.setState({ loading: false });
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
      stakingBalance: "0",
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
        {this.state.loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          ""
        )}
        {/* <div className="container-sm">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5"></div>
          </div>
        </div> */}
        {/* <div className="row justify-content-center">
          <div className="col-md-6 bg-light text-center rounded-3">
            <div className="container-fluid py-5"></div>
          </div>
        </div> */}

        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-8 ">
              <main className="text-center bg-light ml-auto mr-auto rounded-3">
                {this.state.account != "0x0" ? (
                  <Main
                    account={this.state.account}
                    balance={this.state.balance}
                    tokenBalance={this.state.tokenBalance}
                    rewardBalance={this.state.rewardBalance}
                    stakingBalance={this.state.stakingBalance}
                    token={this.state.token}
                    reward={this.state.reward}
                    defi={this.state.defi}
                  />
                ) : (
                  ""
                )}
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
