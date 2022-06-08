const Token = artifacts.require("./Token.sol");
const RWD = artifacts.require("./RWD.sol");
const DeFi = artifacts.require("./DeFi.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DeFi, rwd.address, token.address);
  const defi = await DeFi.deployed();
  //transfer all Rewards to DeFi
  await rwd.transfer(defi.address, "1000000000000000000000000");

  //Distribute rewards to investor
  await token.transfer(accounts[1], await "100000000000000000000");
};
