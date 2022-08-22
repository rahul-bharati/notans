import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const Dai = await ethers.getContractFactory("Dai");
  const dai = await Dai.deploy();

  await dai.deployed();
  const DAI = ethers.utils.formatBytes32String("DAI");
  console.log(`DAI is deployed to ${dai.address}`);

  const Notans = await ethers.getContractFactory("Notans");
  const notans = await Notans.deploy();
  await notans.addToken(DAI, dai.address);

  await notans.deployed();
  console.log(`Notans is deployed to ${notans.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
