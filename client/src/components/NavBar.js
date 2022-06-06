import React, { Component } from "react";
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
              <button
                type="button"
                class="btn-hover  color-7"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {props.tokenBalance ? props.tokenBalance : "0"} BRGRC
              </button>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">
                        Your Account
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      {props.account ? props.account : "0x0"}
                      <p class="text-warning bg-dark">
                        {props.balance ? props.balance : "0"} ETH
                      </p>
                      <p class="text-warning bg-dark">
                        {props.tokenBalance ? props.tokenBalance : "0"} BRGRC
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
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
