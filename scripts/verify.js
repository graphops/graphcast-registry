const { ethers, upgrades } = require("hardhat");
const { createTransaction } = require("@gnosis.pm/safe-core-sdk");
// const {ProxyAdmin} = require("@openzeppelin/contracts-upgradeable/proxy/utils/ProxyAdmin.sol");
const { defender } = require("hardhat");

// TODO Check this address is right before deploying.
const PROXY_ADDRESS = process.env.MAINNET_PROXY_ADDRESS;

async function main() {
  console.log("Verify contracts: ", PROXY_ADDRESS);
  await run(`verify:verify`, {
    address: PROXY_ADDRESS,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 