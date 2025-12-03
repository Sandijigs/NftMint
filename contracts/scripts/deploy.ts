import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying MintOfTheDay contract...");

  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");

  // Contract parameters
  const NAME = "Mint of the Day";
  const SYMBOL = "MOTD";
  const MINT_PRICE = ethers.parseEther("0"); // Free mints initially
  const RESTORE_PRICE = ethers.parseEther("0.001"); // 0.001 ETH to restore streak
  const BASE_URI = "https://mint-of-the-day.app/metadata"; // Update with your actual metadata server

  console.log("\n⚙️  Contract Configuration:");
  console.log("   Name:", NAME);
  console.log("   Symbol:", SYMBOL);
  console.log("   Mint Price:", ethers.formatEther(MINT_PRICE), "ETH");
  console.log("   Restore Price:", ethers.formatEther(RESTORE_PRICE), "ETH");
  console.log("   Base URI:", BASE_URI);

  // Deploy contract
  const MintOfTheDay = await ethers.getContractFactory("MintOfTheDay");
  const contract = await MintOfTheDay.deploy(
    NAME,
    SYMBOL,
    MINT_PRICE,
    RESTORE_PRICE,
    BASE_URI
  );

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("\n✅ Contract deployed to:", contractAddress);
  console.log("📅 Deployment day:", await contract.deploymentDay());

  // Set initial daily themes (optional)
  console.log("\n🎨 Setting initial daily themes...");
  const themes = [
    "ipfs://QmExample1/day0.json", // Day 0 theme
    "ipfs://QmExample2/day1.json", // Day 1 theme
    "ipfs://QmExample3/day2.json", // Day 2 theme
  ];

  const dayNumbers = [0, 1, 2];

  try {
    const tx = await contract.setDailyThemesBatch(dayNumbers, themes);
    await tx.wait();
    console.log("✅ Initial themes set successfully");
  } catch (error) {
    console.log("⚠️  Skipping theme setup (you can do this later)");
  }

  console.log("\n📋 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Contract Address:", contractAddress);
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log("Deployer:", deployer.address);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  console.log("\n📝 Next Steps:");
  console.log("1. Verify contract on Basescan:");
  console.log(`   npx hardhat verify --network ${(await ethers.provider.getNetwork()).name} ${contractAddress} "${NAME}" "${SYMBOL}" ${MINT_PRICE} ${RESTORE_PRICE} "${BASE_URI}"`);
  console.log("\n2. Update frontend .env with:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("\n3. Test minting:");
  console.log(`   Visit: https://sepolia.basescan.org/address/${contractAddress}`);

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentDay: (await contract.deploymentDay()).toString(),
    mintPrice: MINT_PRICE.toString(),
    restorePrice: RESTORE_PRICE.toString(),
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    "deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\n💾 Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
