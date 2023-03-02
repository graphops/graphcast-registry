import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("Graphcast Registry (proxy) V2 with Staking", function () {
  let registry:Contract
  let registryV2:Contract

  beforeEach(async function () {
    const GraphcastRegistry = await ethers.getContractFactory("GraphcastRegistry")
    const GraphcastRegistryV2 = await ethers.getContractFactory("GraphcastRegistryV2")

    //initialize
    registry = await upgrades.deployProxy(GraphcastRegistry, [], { initializer: 'initialize' });
    console.log("Registry contract address:", registry.address);
    await registry.deployed();
    console.log("Implementation contract address: ", await upgrades.erc1967.getImplementationAddress(registry.address))
    console.log("Admin contract address", await upgrades.erc1967.getAdminAddress(registry.address))

    registryV2 = await upgrades.upgradeProxy(registry.address, GraphcastRegistryV2)
    console.log("Registry contract address:", registryV2.address);
    await registryV2.deployed();
    console.log("Implementation contract address: ", await upgrades.erc1967.getImplementationAddress(registryV2.address))
    console.log("Admin contract address", await upgrades.erc1967.getAdminAddress(registryV2.address))
  })
})