require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require('@openzeppelin/hardhat-defender');
require('dotenv').config({path:__dirname+'/.env'})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "arbitrum-sepolia",
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
    "arbitrum-sepolia": {
      url: process.env.ARB_SEPOLIA_ETH_PROVIDER,
      accounts: [process.env.ARB_SEPOLIA_PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.MAINNET_ETH_PROVIDER,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
    "arbitrum-one": {
      url: process.env.ARB_ONE_ETH_PROVIDER,
      accounts: [process.env.ARB_ONE_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "arbitrum-sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://sepolia.arbiscan.io/verifyContract?a=0xbfc972dbdaa102565c071a0ecf488c5165d48acd",
          browserURL: "https://api-sepolia.arbiscan.io/api"
        }
      }
    ]
  },
  arbiscan: {
    apiKey: process.env.ARBISCAN_API_KEY,
    customChains: [
      {
        network: "arbitrum-sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://sepolia.arbiscan.io/verifyContract?a=0xbfc972dbdaa102565c071a0ecf488c5165d48acd",
          browserURL: "https://api-sepolia.arbiscan.io/api"
        }
      }
    ]
  },
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
  },
};
