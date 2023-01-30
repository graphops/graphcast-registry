const { ethers, network, run } = require("hardhat");
const gnosis_safe = "0x5b932ABca637d6E05bc9cE174C46d0b7d734a8bd";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GossipRegistry = await ethers.getContractFactory("GossipRegistry");

  console.log('Deploying GossipRegistry proxy...');
  const registry = await upgrades.deployProxy(GossipRegistry, [deployer.address], { initializer: 'initialize' });

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await registry.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  console.log(`Contract deployed to ${registry.address} on ${network.name}`);

  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: registry.address,
    constructorArguments: [],
  });

  const gr = GossipRegistry.attach(registry.address);
  const admin = await gr.getAdmin();
  console.log(`Update admin from ${admin} to ${gnosis_safe}`);
  await gr.changeAdmin(gnosis_safe);
  // const admin_updated = await gr.getAdmin();
  // console.log('Admin value is', admin_updated);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
