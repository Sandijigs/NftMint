const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(deployer.address);

  console.log("\n=================================");
  console.log("Network:", hre.network.name);
  console.log("Deployer Address:", deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH");
  console.log("=================================\n");

  const minRequired = hre.ethers.parseEther("0.001"); // ~$3 at current ETH prices

  if (balance < minRequired) {
    console.log("⚠️  WARNING: Insufficient balance for deployment!");
    console.log("Required: ~0.001 ETH minimum");
    console.log("\nHow to get Base ETH:");
    console.log("1. Bridge from Ethereum: https://bridge.base.org");
    console.log("2. Buy on exchange and withdraw to Base");
    console.log("3. Use a faucet (mainnet faucets rare)");
  } else {
    console.log("✅ Sufficient balance for deployment");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
