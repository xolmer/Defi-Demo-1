import React from "react";
import burger from "../hamburger-xxl.png";
const Main = (props) => {
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
                <form className=" mb-2">
                  <div>
                    <label
                      className="float-start"
                      style={{ marginLeft: "15px" }}
                    >
                      <b>Stake Tokens</b>
                    </label>
                    <span className="float-end" style={{ marginRight: "8px" }}>
                      <b>Balance:</b>
                    </span>
                    <div className="input-group mb-4">
                      <input type="text" placeholder="0" required />
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

                <button type="submit" className="btn-hover  color-7">
                  Withdraw
                </button>
                <div className="card-body text-center">AIRDROP</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
