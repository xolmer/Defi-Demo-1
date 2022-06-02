// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

///@author Kaveh Aidivandi

interface TokenInterface {
  function totalSupply() external view returns (uint256);

  function balanceOf(address tokenOwner)
    external
    view
    returns (uint256 balance);

  function transfer(address _to, uint256 _amount)
    external
    returns (bool success);

  function allowance(address tokenOwner, address spender)
    external
    view
    returns (uint256 remaining);

  function approve(address _spender, uint256 _amount)
    external
    returns (bool success);

  function transferFrom(
    address _from,
    address _to,
    uint256 _amount
  ) external returns (bool success);
}

contract Token is TokenInterface {
  string public name = "BURGER COIN";
  string public symbol = "BRGRC";
  uint256 public decimals = 18;
  uint256 public totalSupply = 1000000 * 10**decimals;
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

  function balanceOf(address tokenOwner)
    public
    view
    override
    returns (uint256 balance)
  {
    return balances[tokenOwner];
  }

  // Transfer tokens from one address to another
  function transfer(address _to, uint256 _amount)
    public
    override
    returns (bool success)
  {
    require(balances[msg.sender] >= _amount, "Insufficient balance");

    balances[msg.sender] -= _amount;
    balances[_to] += _amount;

    emit Transfer(msg.sender, _to, _amount);
    return true;
  }

  function approve(address _spender, uint256 _amount)
    public
    override
    returns (bool success)
  {
    allowance[msg.sender][_spender] = _amount;
    emit Approval(msg.sender, _spender, _amount);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _amount
  ) external override returns (bool success) {
    require(balances[_from] >= _amount, "Insufficient balance");
    require(allowance[_from][msg.sender] >= _amount);
    // Add the balance for transferfrom
    balances[_from] -= _amount;
    // substract the balance for transferfrom
    balances[_to] += _amount;

    allowance[_from][msg.sender] -= _amount;

    emit Transfer(_from, _to, _amount);
    return true;
  }
}
