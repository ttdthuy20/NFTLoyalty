const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contract…");

  const Contract = await ethers.getContractFactory("SimpleNFT");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
