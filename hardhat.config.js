require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require('@openzeppelin/hardhat-defender');
require('dotenv').config({path:__dirname+'/.env'})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: process.env.GOERLI_ETH_PROVIDER,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    "arbitrum-goerli": {
      url: process.env.ARB_GOERLI_ETH_PROVIDER,
      accounts: [process.env.ARB_GOERLI_PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.MAINNET_ETH_PROVIDER,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "arbitrum-goerli",
        chainId: 421613,
        urls: {
          apiURL: "https://goerli.arbiscan.io/verifyContract?a=0x288316863E22ad578839D8E3B5ffD01d43B30b46",
          browserURL: "https://goerli.arbiscan.io/"
        }
      }
    ]
  },
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
  },
};
