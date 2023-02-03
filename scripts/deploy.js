// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GossipRegistry = await ethers.getContractFactory("GossipRegistry");

  console.log('Deploying GossipRegistry proxy...');
  const registry = await upgrades.deployProxy(GossipRegistry, [], { initializer: 'initialize' });

  console.log("Registry address:", registry.address);
  await registry.deployed();

  console.log("Implementation address: ", await upgrades.erc1967.getImplementationAddress(registry.address))
  console.log("Admin address", await upgrades.erc1967.getAdminAddress(registry.address))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
