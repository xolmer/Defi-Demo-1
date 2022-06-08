const DeFi = artifacts.require("DeFi");

module.exports = async function issueRewards(callback) {
  let decentralBank = await DeFi.deployed();
  await decentralBank.issueRewards();
  console.log("Tokens have been issued successfully!");
  callback();
};
