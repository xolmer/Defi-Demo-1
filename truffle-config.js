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

// 1337 is default chainId from ganache
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
});

export const network = new NetworkConnector({
  urls: {
    1337: "http://localhost:6969",
  },
  defaultChainId: 1,
});
