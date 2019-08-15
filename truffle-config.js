var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "element exercise can rely height finger danger napkin cluster concert process settle";

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/ddbff6fa55104229b1494db2dcedb1cb")
      },
      network_id: 3
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  },
  compilers: {
    solc: {
       version: "^0.5.8",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
