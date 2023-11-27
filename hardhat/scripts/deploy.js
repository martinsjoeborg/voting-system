// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const VotingSystem = await ethers.getContractFactory("VotingSystem");
  const votingSystemDeployed = await VotingSystem.deploy();

  // Wait for the contract to be deployed
  await votingSystemDeployed.waitForDeployment();

  console.log("VotingSystem was deployed to:", votingSystemDeployed.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
