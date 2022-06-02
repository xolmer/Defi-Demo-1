// const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const Tether = artifacts.require("./Tether.sol");

module.exports = async function (deployer) {
  // deployer.deploy(SimpleStorage);
  await deployer.deploy(Tether);
};
