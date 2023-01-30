require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.2",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: INFURA,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    },
    mainnet: {
      url: API_KEY,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN,
  },
};
