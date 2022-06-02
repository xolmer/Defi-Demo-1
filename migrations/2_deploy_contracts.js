const Token = artifacts.require("./Token.sol");
const Reward = artifacts.require("./Reward.sol");
const DeFi = artifacts.require("./DeFi.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(Reward);
  const reward = await Reward.deployed();

  await deployer.deploy(DeFi, reward.address, token.address);
  const defi = await DeFi.deployed();
  //transfer all Rewards to DeFi
  await reward.transfer(defi.address, await reward.totalSupply());

  //Distribute rewards to investor
  await token.transfer(accounts[1], await "100000000000000000000");
};
