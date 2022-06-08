const Token = artifacts.require("./Token.sol");
const RWD = artifacts.require("./RWD.sol");
const DeFi = artifacts.require("./DeFi.sol");

contract("DeFi", ([owner, customer]) => {
  let token, rwd, defi;

  function tokens(number) {
    return web3.utils.toWei(number.toString(), "ether");
  }

  before(async () => {
    token = await Token.new();
    rwd = await RWD.new();
    defi = await DeFi.new(token.address, rwd.address);
    // transfer all tokens to defi contract
    await rwd.transfer(defi.address, tokens(1000000));
    // transfer 100 tokens to customer
    await token.transfer(customer, tokens(100), { from: owner });
  });

  describe("Burger Coin Deployment", async () => {
    it("Matches Token name successfully", async () => {
      let token = await Token.new();
      const name = await token.name();
      assert.equal(name, "BURGER COIN");
    });
  });
  describe("Reward Deployment", async () => {
    it("Matches Reward name successfully", async () => {
      let rwd = await RWD.new();
      const name = await rwd.name();
      assert.equal(name, "FRIES TOKEN");
    });
  });

  describe("DeFi Deployment", async () => {
    it("Contract has tokens", async () => {
      let balance = await rwd.balanceOf(defi.address);
      assert.equal(balance, tokens(1000000));
    });
  });

  //customer has tokens
  describe("Customer has tokens", async () => {
    it("Customer has tokens", async () => {
      let balance = await token.balanceOf(customer);
      assert.equal(balance, tokens(100));
    });
  });

  describe("Yield Farming", async () => {
    it("Rewards tokens for staking", async () => {
      let balance;

      //check staking for customer of 100 tokens
      await token.approve(defi.address, tokens(100), { from: customer });
      await defi.depositTokens(tokens(100), { from: customer });

      balance = await token.balanceOf(customer);
      assert.equal(balance.toString(), tokens(0), "Customer has 0 tokens");

      balance = await token.balanceOf(defi.address);
      assert.equal(balance.toString(), tokens(100), "defi balance is zero");

      balance = await defi.isStaking(customer);
      assert.equal(balance.toString(), "true", "Customer is staking");

      //Issue Rewards
      await defi.issueRewards({ from: owner });

      //Issue Rewards
      // await defi.issueRewards({ from: customer }).should.be.rejected;

      //withdraw customer's tokens
      await defi.withdrawTokens({ from: customer });

      balance = await token.balanceOf(customer);
      assert.equal(balance.toString(), tokens(100), "Customer has 100 tokens");

      balance = await token.balanceOf(defi.address);
      assert.equal(balance.toString(), tokens(0), "defi balance is zero");

      balance = await defi.isStaking(customer);
      assert.equal(balance.toString(), "false", "Customer is not staking");
    });
  });
});
