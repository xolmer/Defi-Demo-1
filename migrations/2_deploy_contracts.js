const Tether = artifacts.require("./Tether.sol");

module.exports = async function (deployer) {
  await deployer.deploy(Tether);
};
