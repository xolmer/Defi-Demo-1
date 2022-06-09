import React, { useEffect, useState, useReducer } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

import Token from "./abis/Token.json";
import DeFi from "./abis/DeFi.json";
import Web3 from "web3";
import Reward from "./abis/RWD.json";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("0x0");
  const [balance, setBalance] = useState("");
  const [token, setToken] = useState(null);
  const [reward, setReward] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [stakingBalance, setStakingBalance] = useState(0);
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
  }, [btnHandler]);
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

  //Deposite Token
  const stakeHandler = async (_value) => {
    setLoading(true);
    token.methods
      .approve(defiAddress, _value)
      .send({ from: account })
      .on("receipt", async (receipt) => {
        await defi.methods

          .depositTokens(_value)
          .send({ from: account })
          .on("receipt", async (receipt) => {
            loadContracts();
            setLoading(false);
          });
      });
  };

  //withdraw Token
  const withdrawHandler = async () => {
    setLoading(true);
    defi.methods
      .withdrawTokens()
      .send({ from: account })
      .on("receipt", async (receipt) => {
        loadContracts();
        setLoading(false);
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
                withdrawHandler={withdrawHandler}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
