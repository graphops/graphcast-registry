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
  },
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
  },
};
