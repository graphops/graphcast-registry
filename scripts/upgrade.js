const { ethers, upgrades } = require("hardhat");
// TODO Check this address is right before deploying.
const PROXY_ADDRESS = process.env.PROXY_ADDRESS;

async function main() {

  const GraphcastRegistryV2 = await ethers.getContractFactory(
    "GraphcastRegistryV2"
  );
  console.log("Upgrading GraphcastRegistry...");

  await upgrades.upgradeProxy(PROXY_ADDRESS, GraphcastRegistryV2);
  console.log("GraphcastRegistry upgraded");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
 