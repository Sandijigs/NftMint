const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0xfee2B3154eA75bA762601e816EDbaBb75920Fa47";

  const MintOfTheDay = await hre.ethers.getContractAt("MintOfTheDay", contractAddress);

  const currentDay = await MintOfTheDay.getCurrentDay();
  const deploymentDay = await MintOfTheDay.deploymentDay();

  console.log("Current Day:", currentDay.toString());
  console.log("Deployment Day:", deploymentDay.toString());
  console.log("Days since deployment:", currentDay.toString());

  // Check user stats for a test address
  const testAddress = process.env.TEST_ADDRESS || "0x0000000000000000000000000000000000000000";
  if (testAddress !== "0x0000000000000000000000000000000000000000") {
    const stats = await MintOfTheDay.getUserStats(testAddress);
    console.log("\nUser Stats for", testAddress);
    console.log("lastMintDay:", stats[0].toString());
    console.log("currentStreak:", stats[1].toString());
    console.log("longestStreak:", stats[2].toString());
    console.log("totalMints:", stats[3].toString());
    console.log("canMint:", stats[4]);
    console.log("canRestore:", stats[5]);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
