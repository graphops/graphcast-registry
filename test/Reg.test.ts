const { ethers, upgrades } = require("hardhat");
const expect = require('chai');
 
let Registry;
let registry;
 
describe('Registry', function () {
  beforeEach(async function () {
    Registry = await ethers.getContractFactory("GraphcastRegistry");
    registry = await Registry.deploy();
    await registry.deployed();
  });
 
  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await registry.setGraphcastID("0xE9a1CABd57700B17945Fd81feeFba82340D9568F");
 
    expect((await registry.graphcastIDRegistered('0xE9a1CABd57700B17945Fd81feeFba82340D9568F')));
    expect(!(await registry.graphcastIDRegistered('0x2bC5349585cbBF924026D25a520ffa9E8b51A39b')));
  });
});
