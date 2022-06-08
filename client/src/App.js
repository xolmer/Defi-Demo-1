import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Token from "./abis/Token.json";
import Reward from "./abis/RWD.json";
import DeFi from "./abis/DeFi.json";
import Web3 from "web3";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("0x0");
  const [balance, setBalance] = useState("");
  const [token, setToken] = useState(null);
  const [reward, setReward] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [rewardBalance, setRewardBalance] = useState(null);
  const [stakingBalance, setStakingBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [defi, setDefi] = useState(null);
  const [defiAddress, setDefiAddress] = useState("");

  const btnHandler = async () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      loadContracts();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Please install MetaMask to use this dapp. You can find it at https://metamask.io/"
      );
    }
  };

  useEffect(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      loadContracts();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Please install MetaMask to use this dapp. You can find it at https://metamask.io/"
      );
    }
  }, []);
  const loadContracts = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(account[0]);
    setAccount(account[0]);
    setBalance(web3.utils.fromWei(balance, "ether"));
    const networkID = await web3.eth.net.getId();

    const tokenAddress = Token.networks[networkID].address;
    const rewardAddress = Reward.networks[networkID].address;
    const defiAddress = DeFi.networks[networkID].address;
    console.log(defiAddress + " DEFI ADDresses");

    const token = new web3.eth.Contract(Token.abi, tokenAddress);
    const reward = new web3.eth.Contract(Reward.abi, rewardAddress);
    const defi = new web3.eth.Contract(DeFi.abi, defiAddress);

    setToken(token);
    setReward(reward);
    setDefi(defi);
    setDefiAddress(defiAddress);
    const tokenBalance = await token.methods.balanceOf(account[0]).call();
    const rewardBalance = await reward.methods.balanceOf(account[0]).call();
    const stakingBalance = await defi.methods.stakingBalance(account[0]).call();
    setTokenBalance(web3.utils.fromWei(tokenBalance, "ether"));
    setRewardBalance(web3.utils.fromWei(rewardBalance, "ether"));
    setStakingBalance(web3.utils.fromWei(stakingBalance, "ether"));
    setLoading(false);
  };

  // Stake Function
  // Deposite Function
  // Withdraw Function
  // Claim Reward Function

  // stakeTokens = (amount) => {
  //   this.setState({ loading: true });
  //   this.state.tether.methods
  //     .approve(this.state.decentralBank._address, amount)
  //     .send({ from: this.state.account })
  //     .on("transactionHash", (hash) => {
  //       this.state.decentralBank.methods
  //         .depositTokens(amount)
  //         .send({ from: this.state.account })
  //         .on("transactionHash", (hash) => {
  //           this.setState({ loading: false });
  //         });
  //     });
  // };

  // unstakeTokens = () => {
  //   this.setState({ loading: true });
  //   this.state.decentralBank.methods
  //     .unstakeTokens()
  //     .send({ from: this.state.account })
  //     .on("transactionHash", (hash) => {
  //       this.setState({ loading: false });
  //     });
  // };

  const stakeHandler = async (amount) => {
    setLoading(true);
    token.methods
      .approve(defiAddress, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        defi.methods
          .depositTokens(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };

  return (
    <>
      <NavBar
        account={account}
        tokenBalance={tokenBalance}
        rewardBalance={rewardBalance}
        stakingBalance={stakingBalance}
        balance={balance}
        btnHandler={btnHandler}
      />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        ""
      )}
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-8 ">
            <main className="text-center bg-light ml-auto mr-auto rounded-3">
              <Main
                account={account}
                token={token}
                reward={reward}
                defi={defi}
                tokenBalance={tokenBalance}
                rewardBalance={rewardBalance}
                stakingBalance={stakingBalance}
                stakeHandler={stakeHandler}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
