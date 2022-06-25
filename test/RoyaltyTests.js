const { expect } = require("chai");
const { ethers } = require("hardhat");


/**
 * Test info:
 * run with `npx hardhat test`
 * 
 * Since this is called from a test and not on-chain, the responses can be a little wonky from functions
 * that aren't `view` functions
 * 
 * In that case, you'll need to preface the function name with `callStatic` i.e:
 * `await royalty.callStatic.mintSoftware(.........)`
 * 
 * Since we're using Hardhat, we can make use of hardhats console and `console.log() things inside of the smart contract`
 * ^^^ very useful for debugging in tests
 * 
 */

describe("test royalty", function () {
  it("should mint a top level NFT", async function () {
    const [owner] = await ethers.getSigners();
    const Royalty = await ethers.getContractFactory("Royalty");
    const royalty = await Royalty.deploy();
    await royalty.deployed();

    const initialCount = await royalty.getAllSoftware();
    expect(initialCount).to.equal(0);
    
    await royalty.mintTopLevelSoftware(owner.address, 'www.google.com');
    const currentCount = await royalty.getAllSoftware();
    expect(currentCount).to.equal(1);
  });
  
  it("should mint a child NFT and get details", async function () {
    const [owner] = await ethers.getSigners();
    const Royalty = await ethers.getContractFactory("Royalty");
    const royalty = await Royalty.deploy();
    await royalty.deployed();

    await royalty.mintTopLevelSoftware(owner.address, 'www.parent.com');
    await royalty.mintSoftware(owner.address, 0, 100, 'www.child.com');

    const details = await royalty.getSoftwareDetails(1);
    expect(details[6]).to.equal('www.child.com');
    expect(details[1]).to.equal('1');
  });
  
  it("should get list of the children given a parent id", async function () {
    const [owner] = await ethers.getSigners();
    const Royalty = await ethers.getContractFactory("Royalty");
    const royalty = await Royalty.deploy();
    await royalty.deployed();

    await royalty.mintTopLevelSoftware(owner.address, 'www.parent1.com');
    await royalty.mintSoftware(owner.address, 0, 100, 'www.child1.com');
    await royalty.mintSoftware(owner.address, 0, 200, 'www.child2.com');

    const children = await royalty.getChildren('0');

    expect(children[1].toString()).to.equal('1');
    expect(children[2].toString()).to.equal('2');
  });

  it("should allow a user to purchase a child software", async function () {
    const [owner] = await ethers.getSigners();
    const Royalty = await ethers.getContractFactory("Royalty");
    const royalty = await Royalty.deploy();
    await royalty.deployed();

    await royalty.mintTopLevelSoftware(owner.address, 'www.parent1.com');
    await royalty.mintSoftware(owner.address, 0, 100, 'www.child1.com');

    await royalty.purchase(1, { value: 100 });

  });
  // it("should get all parents for distribute function", async function () {
  //   const [owner] = await ethers.getSigners();
  //   const Royalty = await ethers.getContractFactory("Royalty");
  //   const royalty = await Royalty.deploy();
  //   await royalty.deployed();

  //   await royalty.mintTopLevelSoftware(owner.address, 'www.parent1.com');
  //   await royalty.mintSoftware(owner.address, 0, 100, 'www.child1.com');
  //   await royalty.mintSoftware(owner.address, 1, 100, 'www.child2.com');

  //   const foo = await royalty.distribute(2, 100);

  // });
});
