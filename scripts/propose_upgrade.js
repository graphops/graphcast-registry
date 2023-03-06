const { ethers, upgrades } = require("hardhat");
const { createTransaction } = require("@gnosis.pm/safe-core-sdk");
// const {ProxyAdmin} = require("@openzeppelin/contracts-upgradeable/proxy/utils/ProxyAdmin.sol");
const { defender } = require("hardhat");

// TODO Check this address is right before deploying.
const PROXY_ADDRESS = process.env.GOERLI_PROXY_ADDRESS;

async function main() {
  console.log(PROXY_ADDRESS," original Registry(proxy) address")
  const GraphcastRegistryV2 = await ethers.getContractFactory(
    "GraphcastRegistryV2"
  );
  const registry = await GraphcastRegistryV2.deploy();
  await registry.deployed();
  await registry.deployTransaction.wait(5);

  console.log("New implementation contract: ", registry.address);

  console.log("Preparing proposal...");
  const proposal = await defender.proposeUpgrade(PROXY_ADDRESS, GraphcastRegistryV2);
  console.log("Upgrade proposal created at:", proposal.url);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 