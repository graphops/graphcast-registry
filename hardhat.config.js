require("@nomicfoundation/hardhat-toolbox");
const ALCHEMY_API_KEY = "cfHtiQnbDKs69TiOsV6SYEzKmvZjquqp"
const ALCHEMY_API_ENDPOINT = "https://eth-goerli.g.alchemy.com/v2/cfHtiQnbDKs69TiOsV6SYEzKmvZjquqp"
const GOERLI_PRIVATE_KEY = "c5b53a57d471d9c36dff037354d99363a08af7958f1434bdbc694d42c959ff47"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.7.6",
  networks: {
    goerli: {
      url: ALCHEMY_API_ENDPOINT,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    }
  }
};
