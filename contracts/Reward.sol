// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

///@author Kaveh Aidivandi

contract Reward {
  string public name = "FRIES TOKEN";
  string public symbol = "FRST";
  uint256 public totalSupply = 10000000000000000000000000;
  uint256 public decimals = 18;
  address public owner;

  mapping(address => uint256) public balances;

  // Allowance is the amount of tokens that an owner allowed to a spender.
  mapping(address => mapping(address => uint256)) public allowance;

  // Event emitted when a transfer is made
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  constructor() {
    owner = msg.sender;
    balances[owner] = totalSupply;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner allowed");
    _;
  }

  // Transfer tokens from one address to another
  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balances[msg.sender] >= _value, "Insufficient balance");

    balances[msg.sender] -= _value;
    balances[_to] += _value;

    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value)
    public
    returns (bool success)
  {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) external returns (bool success) {
    require(balances[_from] >= _value, "Insufficient balance");
    require(allowance[_from][msg.sender] >= _value);
    // Add the balance for transferfrom
    balances[_from] -= _value;
    // substract the balance for transferfrom
    balances[_to] += _value;

    allowance[_from][msg.sender] -= _value;

    emit Transfer(_from, _to, _value);
    return true;
  }
}
