const { ethers, network, run } = require("hardhat");
// const GNOSIS_SAFE = process.env.ARB_ONE_GNOSIS_SAFE;
// const PROXY_ADDRESS = process.env.GOERLI_PROXY_ADDRESS;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GraphcastRegistry = await ethers.getContractFactory("GraphcastRegistry");

  console.log('Deploying GraphcastRegistry proxy...');
  const registry = await upgrades.deployProxy(GraphcastRegistry, [], { initializer: 'initialize', proxyContract: "GraphcastRegistryProxy", proxyAdmin: GNOSIS_SAFE });

  console.log("Registry contract address:", registry.address);
  await registry.deployed();

  console.log("Implementation contract address: ", await upgrades.erc1967.getImplementationAddress(registry.address))
  console.log("Admin contract address", await upgrades.erc1967.getAdminAddress(registry.address))

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await registry.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  console.log(`Contract deployed to ${registry.address} on ${network.name}`);
  const gr = GraphcastRegistry.attach(registry.address);
  const owner = await gr.owner();
  console.log(`Owner address (should be the deployer): ${owner}`)

  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: registry.address,
    constructorArguments: [],
  });

  // Transfer ownership of Implementation contract and Proxy contract
  console.log(`Set contract owner from ${owner} to Gnosis Safe ${GNOSIS_SAFE}`);
  await gr.transferOwnership(GNOSIS_SAFE);

  console.log(
    `Transferring ownership of Proxy Admin to Gnosis Safe: ${GNOSIS_SAFE}`
  );
  await upgrades.admin.transferProxyAdminOwnership(GNOSIS_SAFE);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
