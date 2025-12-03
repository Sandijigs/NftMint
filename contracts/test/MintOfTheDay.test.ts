import { expect } from "chai";
import { ethers } from "hardhat";
import { MintOfTheDay } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("MintOfTheDay", function () {
  let contract: MintOfTheDay;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  const MINT_PRICE = ethers.parseEther("0");
  const RESTORE_PRICE = ethers.parseEther("0.001");
  const BASE_URI = "https://test.com/metadata";

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const MintOfTheDay = await ethers.getContractFactory("MintOfTheDay");
    contract = await MintOfTheDay.deploy(
      "Mint of the Day",
      "MOTD",
      MINT_PRICE,
      RESTORE_PRICE,
      BASE_URI
    );
    await contract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should set the correct mint price", async function () {
      expect(await contract.mintPrice()).to.equal(MINT_PRICE);
    });

    it("Should set the correct restore price", async function () {
      expect(await contract.restorePrice()).to.equal(RESTORE_PRICE);
    });
  });

  describe("Daily Minting", function () {
    it("Should allow first daily mint", async function () {
      await expect(contract.connect(user1).mintDaily({ value: MINT_PRICE }))
        .to.emit(contract, "DailyMint")
        .withArgs(user1.address, 0, 0, 1, 1);

      const stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(1);
      expect(stats.longestStreak).to.equal(1);
      expect(stats.totalMints).to.equal(1);
    });

    it("Should prevent minting twice in same day", async function () {
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      await expect(
        contract.connect(user1).mintDaily({ value: MINT_PRICE })
      ).to.be.revertedWithCustomError(contract, "AlreadyMintedToday");
    });

    it("Should increment streak for consecutive days", async function () {
      // Day 0
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      // Advance 1 day
      await time.increase(24 * 60 * 60);

      // Day 1
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      const stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(2);
      expect(stats.longestStreak).to.equal(2);
    });

    it("Should reset streak if day is skipped", async function () {
      // Day 0
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      // Advance 2 days (skip day 1)
      await time.increase(2 * 24 * 60 * 60);

      // Day 2
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      const stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(1);
      expect(stats.longestStreak).to.equal(1);
    });

    it("Should track longest streak correctly", async function () {
      // Build a 3-day streak
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });
      await time.increase(24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });
      await time.increase(24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      let stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(3);
      expect(stats.longestStreak).to.equal(3);

      // Break streak
      await time.increase(2 * 24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(1);
      expect(stats.longestStreak).to.equal(3); // Should preserve longest
    });
  });

  describe("Streak Restoration", function () {
    it("Should allow streak restoration within 48 hours", async function () {
      // Build a 3-day streak
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });
      await time.increase(24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });
      await time.increase(24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      // Skip a day (breaks streak)
      await time.increase(2 * 24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      let stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(1);
      expect(stats.canRestore).to.equal(true);

      // Restore streak
      await expect(
        contract.connect(user1).restoreStreak({ value: RESTORE_PRICE })
      ).to.emit(contract, "StreakRestored");

      stats = await contract.getUserStats(user1.address);
      expect(stats.currentStreak).to.equal(3);
      expect(stats.canRestore).to.equal(false);
    });

    it("Should not allow restoration after 48 hours", async function () {
      // Build and break streak
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });
      await time.increase(2 * 24 * 60 * 60);
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      // Wait 3 days (more than 48 hours after streak broke)
      await time.increase(3 * 24 * 60 * 60);

      // After 48 hours, broken streak is cleared, so it reverts with NoBrokenStreak
      await expect(
        contract.connect(user1).restoreStreak({ value: RESTORE_PRICE })
      ).to.be.revertedWithCustomError(contract, "NoBrokenStreak");
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to set daily theme", async function () {
      const themeURI = "ipfs://QmTest123";
      await expect(contract.setDailyTheme(0, themeURI))
        .to.emit(contract, "ThemeUpdated")
        .withArgs(0, themeURI);

      expect(await contract.dailyThemes(0)).to.equal(themeURI);
    });

    it("Should allow batch theme setting", async function () {
      const days = [0, 1, 2];
      const themes = [
        "ipfs://QmTest1",
        "ipfs://QmTest2",
        "ipfs://QmTest3",
      ];

      await contract.setDailyThemesBatch(days, themes);

      expect(await contract.dailyThemes(0)).to.equal(themes[0]);
      expect(await contract.dailyThemes(1)).to.equal(themes[1]);
      expect(await contract.dailyThemes(2)).to.equal(themes[2]);
    });

    it("Should allow owner to pause and unpause", async function () {
      await contract.pause();

      await expect(
        contract.connect(user1).mintDaily({ value: MINT_PRICE })
      ).to.be.revertedWithCustomError(contract, "EnforcedPause");

      await contract.unpause();

      await expect(
        contract.connect(user1).mintDaily({ value: MINT_PRICE })
      ).to.not.be.reverted;
    });

    it("Should not allow non-owner to set themes", async function () {
      await expect(
        contract.connect(user1).setDailyTheme(0, "ipfs://test")
      ).to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount");
    });
  });

  describe("Multiple Users", function () {
    it("Should track multiple users independently", async function () {
      // User1 mints
      await contract.connect(user1).mintDaily({ value: MINT_PRICE });

      // User2 mints
      await contract.connect(user2).mintDaily({ value: MINT_PRICE });

      const stats1 = await contract.getUserStats(user1.address);
      const stats2 = await contract.getUserStats(user2.address);

      expect(stats1.totalMints).to.equal(1);
      expect(stats2.totalMints).to.equal(1);
      expect(stats1.canMint).to.equal(false);
      expect(stats2.canMint).to.equal(false);
    });
  });
});
