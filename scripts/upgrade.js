const { ethers, upgrades } = require("hardhat");
// TODO Check this address is right before deploying.
const PROXY_ADDRESS = process.env.PROXY_ADDRESS;

async function main() {

  const GossipRegistryV2 = await ethers.getContractFactory(
    "GossipRegistryV2"
  );
  console.log("Upgrading GossipRegistry...");

  await upgrades.upgradeProxy(PROXY_ADDRESS, GossipRegistryV2);
  console.log("GossipRegistry upgraded");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
 