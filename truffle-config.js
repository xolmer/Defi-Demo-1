const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/abis"),
  contracts_directory: "./contracts",
  networks: {
    xolmer: {
      network_id: "*",
      port: 6969,
      host: "127.0.0.1",
      gas: "1000000",
      gasPrice: "1000000",
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
