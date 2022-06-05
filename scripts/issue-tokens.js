const defi = artifacts.require("DeFi");

module.exports = async function issueRewards(callback) {
  let defi = await defi.deployed();
  await defi.issueRewards();
  console.log("Rewards Issued successfully!");
  callback();
};
