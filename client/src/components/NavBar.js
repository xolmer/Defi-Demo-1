import React from "react";
import bank from "../logo1.png";
const NavBar = (props) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        // style={{
        //   backgroundImage:
        //     "linear-gradient( 109.6deg,  rgba(61,245,167,1) 11.2%, rgba(9,111,224,1) 91.1% )",
        // }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={bank} alt="Defi" width="100" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a> */}
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li> */}
            </ul>
            <div>
              {props.account != "0x0" ? (
                <button
                  type="button"
                  className="btn-hover  color-7"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  {props.tokenBalance ? props.tokenBalance : "0"} BRGRC
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-hover  color-7"
                  onClick={props.btnHandler}
                >
                  Connect to Wallet
                </button>
              )}

              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Your Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p className="text-info bg-dark">
                        ETH Account:{" "}
                        {" " + props.account ? props.account : "0x0"}
                      </p>
                      <p className="text-warning bg-dark">
                        Ethereum Balance :{" "}
                        {" " + props.balance ? props.balance : "0"} ETH
                      </p>
                      <p className="text-warning bg-dark">
                        BRGRC Balance :
                        {" " + props.tokenBalance ? props.tokenBalance : "0"}{" "}
                        BRGRC
                      </p>
                      <p className="text-warning bg-dark">
                        Reward Balance:
                        {" " + props.rewardBalance > 0
                          ? props.rewardBalance
                          : "0"}{" "}
                        RWDT
                      </p>
                      <p className="text-warning bg-dark">
                        Staking Balance :
                        {" " + props.stakingBalance > 0
                          ? props.stakingBalance
                          : "0"}{" "}
                        BRGRC
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      {/* <button type="button" class="btn btn-primary">
                        Understood
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
