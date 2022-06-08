const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/abis"),
  contracts_directory: "./contracts",
  networks: {
    xolmer: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1",
    },
  },
  compilers: {
    solc: {
      version: "^0.7.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
