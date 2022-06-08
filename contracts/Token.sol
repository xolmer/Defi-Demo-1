// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

///@author Kaveh Aidivandi

contract Token {
  string public name = "BURGER COIN";
  string public symbol = "BRGRC";
  uint256 public decimals = 18;
  uint256 public totalSupply = 1000000 * 10**decimals;
  address public owner;

  mapping(address => uint256) public balanceOf;

  // Allowance is the amount of tokens that an owner allowed to a spender.
  mapping(address => mapping(address => uint256)) public allowance;

  // Event emitted when a transfer is made
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  constructor() {
    owner = msg.sender;
    balanceOf[owner] = totalSupply;
  }

  // Transfer tokens from one address to another
  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value, "Insufficient balance");

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

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
    uint256 _amount
  ) public payable returns (bool) {
    require(balanceOf[_from] >= _amount, "Insufficient Token balance");
    require(allowance[_from][msg.sender] >= _amount);

    balanceOf[_to] += _amount;
    balanceOf[_from] -= _amount;
    allowance[_from][msg.sender] -= _amount;
    // transfer(_to, _amount);
    emit Transfer(_from, _to, _amount);
    return true;
  }
}

// function transferFrom(
//   address _from,
//   address _to,
//   uint256 _value
// ) public returns (bool success) {
//   require(balanceOf[_from] >= _value, "Insufficient Token balance");
//   require(allowance[_from][msg.sender] >= _value);
//   // Add the balance for transferfrom
//   balanceOf[_from] -= _value;
//   // substract the balance for transferfrom
//   balanceOf[_to] += _value;

//   allowance[_from][msg.sender] -= _value;

//   emit Transfer(_from, _to, _value);
//   return true;
// }
