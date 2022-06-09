import React, { useRef } from "react";
import AirDrop from "./AirDrop";
import burger from "../hamburger-xxl.png";
const Main = (props) => {
  const amountRef = useRef(null);
  const submitHandler = (event) => {
    event.preventDefault();
    let amount = amountRef.current.value.toString();
    amount = window.web3.utils.toWei(amount, "Ether");
    props.stakeHandler(amount);
    amountRef.current.value = "";
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 ">
            <main className="text-center ml-auto mr-auto rounded-3">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Staking Balance</th>
                    <th scope="col">Reward Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" " + props.stakingBalance > 0
                        ? props.stakingBalance
                        : "0"}{" "}
                      BRGRC
                    </td>
                    <td>
                      {" " + props.rewardBalance > 0
                        ? props.rewardBalance
                        : "0"}{" "}
                      RWDT
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mb-2">
                {/* <form onSubmit={handleSubmit} className="mb-2"> */}
                <form onSubmit={submitHandler} className="mb-2">
                  <div>
                    <label
                      className="float-start"
                      style={{ marginLeft: "15px" }}
                    >
                      <b>Stake Tokens</b>
                    </label>
                    <span className="float-end" style={{ marginRight: "8px" }}>
                      <b>Balance:</b> {props.tokenBalance} BRGRC
                    </span>
                    <div className="input-group mb-4">
                      <input ref={amountRef} />
                      {/* <input
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        value={formData.amount}
                        type="text"
                        name="amount"
                        id="amount"
                      /> */}
                      <div className="input-group-open">
                        &nbsp;&nbsp;
                        <img src={burger} alt="tether" height="32" />
                        &nbsp;&nbsp;&nbsp; BRGRC
                      </div>
                    </div>

                    <button type="submit" className="btn-hover  color-7">
                      DEPOSIT
                    </button>
                  </div>
                </form>

                <button
                  type="submit"
                  className="btn-hover  color-7"
                  onClick={props.withdrawHandler}
                >
                  Withdraw
                </button>
                <div className="card-body text-center">
                  {/* AIRDROP <AirDrop stakingBalance={props.stakingBalance} /> */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
