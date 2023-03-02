const { ethers, upgrades } = require("hardhat");
// TODO Check this address is right before deploying.
const PROXY_ADDRESS = process.env.GOERLI_PROXY_ADDRESS;

async function main() {
  console.log(PROXY_ADDRESS," original Registry(proxy) address")
  const GraphcastRegistryV2 = await ethers.getContractFactory(
    "GraphcastRegistryV2"
  );
  console.log("Upgrading to GraphcastRegistryV2...");

  upgradedRegistry = await upgrades.upgradeProxy(PROXY_ADDRESS, GraphcastRegistryV2);
  await upgradedRegistry.deployed();
  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await upgradedRegistry.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
  console.log("GraphcastRegistry upgraded");
  console.log("Registry contract address (should be same as above):", upgradedRegistry.address);
  console.log("Implementation contract address: ", await upgrades.erc1967.getImplementationAddress(upgradedRegistry.address))
  console.log("Admin contract address", await upgrades.erc1967.getAdminAddress(upgradedRegistry.address))
  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: upgradedRegistry.address,
    constructorArguments: [],
  });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
 