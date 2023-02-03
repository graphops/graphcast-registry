require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require('dotenv').config({path:__dirname+'/.env'})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: process.env.INFURA,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.API_KEY,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN,
  },
};
