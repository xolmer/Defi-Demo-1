// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./Token.sol";
import "./RWD.sol";

contract DeFi {
  string public name = "DeFi";
  address public owner;
  Token public token;
  RWD public rwd;

  address[] public stakers;

  mapping(address => uint256) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(Token _token, RWD _rwd) {
    owner = msg.sender;
    token = _token;
    rwd = _rwd;
  }

  //staking function
  function depositTokens(uint256 _value) public {
    require(_value > 0, "Amount must be greater than 0");
    //Transfer tokens to this contract address for staking
    token.transferFrom(msg.sender, address(this), _value);
    //updating staing balance
    stakingBalance[msg.sender] += _value;

    if (!hasStaked[msg.sender]) {
      //updating stakers array
      stakers.push(msg.sender);
    }
    //updating staking status
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

  function issueRewards() public {
    //calculate total staked tokens
    require(msg.sender == owner, "The caller must be the owner");

    for (uint256 i = 0; i < stakers.length; i++) {
      address staker = stakers[i];
      uint256 earned = stakingBalance[staker] / 9;
      //transfer reward to staker
      if (earned > 0) {
        rwd.transfer(staker, earned);
      }
    }
  }

  function withdrawTokens() public {
    uint256 balance = stakingBalance[msg.sender];
    require(balance > 0, "You must have staked tokens to withdraw");

    //transfer tokens to sender
    token.transfer(msg.sender, balance);
    //updating staking balance
    stakingBalance[msg.sender] = 0;
    //updating staking status
    isStaking[msg.sender] = false;
  }
}
