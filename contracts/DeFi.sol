// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./Token.sol";
import "./Reward.sol";

contract DeFi {
  address public owner;
  string public name;
  Token public token;
  Reward public reward;

  constructor(Reward _reward, Token _token) {
    owner = msg.sender;
    name = "DeFi";
    token = _token;
    reward = _reward;
  }
}
