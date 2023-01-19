const { ethers, upgrades } = require("hardhat");

async function main() {
  // TODO Check this address is right before deploying.
  const deployedProxyAddress = "0x5d3ec73b723ac7effbD616a6a53281ED6302f526";

  const GossipRegistryV2 = await ethers.getContractFactory(
    "GossipRegistryV2"
  );
  console.log("Upgrading GossipRegistry...");

  await upgrades.upgradeProxy(deployedProxyAddress, GossipRegistryV2);
  console.log("GossipRegistry upgraded");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
 