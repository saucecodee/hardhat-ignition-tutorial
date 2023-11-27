const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const tokenContract = await ethers.deployContract("Token");

    return { tokenContract, owner, addr1, addr2 };
  }

  it("Should assign the total supply of tokens to the owner", async function () {
    const { tokenContract, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await tokenContract.balanceOf(owner.address);
    expect(await tokenContract.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { tokenContract, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

    // Transfer 50 tokens from owner to addr1
    await expect(tokenContract.transfer(addr1.address, 50))
      .to
      .changeTokenBalances(tokenContract, [owner, addr1], [-50, 50]);

    // Transfer 50 tokens from addr1 to addr2
    await expect(tokenContract.connect(addr1).transfer(addr2.address, 50))
      .to
      .changeTokenBalances(tokenContract, [addr1, addr2], [-50, 50]);
  });
});