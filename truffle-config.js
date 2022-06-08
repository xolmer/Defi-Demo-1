const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");
const path = require("path");
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/abis"),
  contracts_directory: "./contracts",
  networks: {
    xolmer: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1",
    },
    inf_yieldfarming_rinkeby: {
      network_id: 4,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(
        fs.readFileSync("/Users/xolmer/code/infuravscode.env", "utf-8"),
        "https://rinkeby.infura.io/v3/7d53741c028a45169e98d43524dc520e"
      ),
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
