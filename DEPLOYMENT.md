# 📋 Deployment Guide - Mint of the Day

Complete step-by-step guide to deploy your Mini App to production.

## 🎯 Pre-Deployment Checklist

### Required Accounts & Keys

- [ ] Base Sepolia ETH in your wallet ([Get from faucet](https://portal.cdp.coinbase.com/products/faucet))
- [ ] Base Mainnet ETH (minimum 0.01 ETH for deployment + gas)
- [ ] Basescan API key ([Get here](https://basescan.org/apis))
- [ ] Coinbase Developer Platform API key ([Get here](https://portal.cdp.coinbase.com/))
- [ ] GitHub account (for open-source contribution metric)
- [ ] Vercel account (for frontend hosting)
- [ ] Farcaster account (for social traction)

### Environment Setup

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## 🔧 Phase 1: Smart Contract Deployment (Base Sepolia)

### Step 1.1: Install Dependencies

```bash
cd contracts
npm install
```

### Step 1.2: Configure Environment

Create `.env` file:

```bash
cp .env.example .env
nano .env
```

Add your private key:
```bash
PRIVATE_KEY=your_wallet_private_key_without_0x
BASESCAN_API_KEY=your_basescan_api_key
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

⚠️ **Security**: Never commit `.env` to Git! It's in `.gitignore`.

### Step 1.3: Compile Contracts

```bash
npm run compile
```

Expected output:
```
Compiled 15 Solidity files successfully
```

### Step 1.4: Run Tests

```bash
npm test
```

All tests should pass ✅

### Step 1.5: Deploy to Base Sepolia

```bash
npm run deploy:sepolia
```

**Save this output:**
```
✅ Contract deployed to: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4
📅 Deployment day: 19825
```

### Step 1.6: Verify on Basescan

```bash
npx hardhat verify --network baseSepolia \
  0xYOUR_CONTRACT_ADDRESS \
  "Mint of the Day" \
  "MOTD" \
  "0" \
  "1000000000000000" \
  "https://mint-of-the-day.app/metadata"
```

Check verification at: `https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS`

### Step 1.7: Test Minting

Visit Basescan → Write Contract → Connect Wallet → `mintDaily()`

---

## 🎨 Phase 2: Frontend Deployment (Testnet)

### Step 2.1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2.2: Configure Environment

```bash
cp .env.example .env.local
nano .env.local
```

Add your values:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_SEPOLIA_CONTRACT
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_CDP_API_KEY=your_coinbase_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2.3: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test:
- [ ] Wallet connection works
- [ ] Daily theme displays
- [ ] Mint button functions
- [ ] User stats update after mint
- [ ] Share button works

### Step 2.4: Deploy to Vercel (Testnet)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Follow prompts, then add environment variables in Vercel dashboard.

**Test the live site!**

---

## 🚀 Phase 3: Mainnet Launch

### Step 3.1: Get Base Mainnet ETH

Options:
- Bridge from Ethereum: [bridge.base.org](https://bridge.base.org)
- Buy directly on Base: [Coinbase](https://coinbase.com)
- DEX swap on Base

**Recommended amount**: 0.02 ETH (deployment + initial operations)

### Step 3.2: Deploy Contract to Base Mainnet

Update `.env` if needed:
```bash
BASE_RPC_URL=https://mainnet.base.org
```

Deploy:
```bash
cd contracts
npm run deploy:mainnet
```

**SAVE THE CONTRACT ADDRESS!** You'll need it everywhere.

### Step 3.3: Verify Mainnet Contract

```bash
npx hardhat verify --network base \
  0xYOUR_MAINNET_CONTRACT_ADDRESS \
  "Mint of the Day" \
  "MOTD" \
  "0" \
  "1000000000000000" \
  "https://mint-of-the-day.app/metadata"
```

### Step 3.4: Set Daily Themes (Optional but Recommended)

Create `scripts/setThemes.ts`:
```typescript
import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractAt(
    "MintOfTheDay",
    "0xYOUR_CONTRACT_ADDRESS"
  );

  const days = [0, 1, 2, 3, 4, 5, 6];
  const themes = [
    "ipfs://QmYourDay0Theme",
    "ipfs://QmYourDay1Theme",
    "ipfs://QmYourDay2Theme",
    "ipfs://QmYourDay3Theme",
    "ipfs://QmYourDay4Theme",
    "ipfs://QmYourDay5Theme",
    "ipfs://QmYourDay6Theme",
  ];

  const tx = await contract.setDailyThemesBatch(days, themes);
  await tx.wait();
  console.log("✅ Themes set!");
}

main();
```

Run:
```bash
npx hardhat run scripts/setThemes.ts --network base
```

### Step 3.5: Deploy Frontend (Production)

Update Vercel environment variables:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_MAINNET_CONTRACT
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

Deploy:
```bash
vercel --prod
```

### Step 3.6: Final Testing

**Critical checks before announcement:**
- [ ] Mint works on mainnet
- [ ] Streak tracking accurate
- [ ] User stats display correctly
- [ ] Share to Farcaster works
- [ ] Leaderboard loads
- [ ] Contract verified on Basescan
- [ ] Mobile responsive
- [ ] Wallet connection smooth

---

## 📣 Phase 4: Launch Announcement

### Step 4.1: Submit to Base

- Base Mini App Directory: [Link when available]
- Base Builders Telegram: Share your deployment
- Base Discord: #showcase channel

### Step 4.2: Farcaster Launch

Create launch cast with Frame:

```
🎨 Mint of the Day is LIVE on Base!

✨ Mint one unique NFT daily
🔥 Build consecutive streaks
🏆 Climb the leaderboard
⛓️ 100% onchain

Start your streak: [your-url]

[Frame embedded]
```

### Step 4.3: GitHub Repository

- [ ] Push code to GitHub (make sure `.env` is gitignored!)
- [ ] Add proper README
- [ ] Add MIT license
- [ ] Create first release (v1.0.0)
- [ ] Add topics: `base`, `nft`, `web3`, `blockchain`

### Step 4.4: Community Outreach

Post in:
- [ ] r/Base (Reddit) - if exists
- [ ] Base Telegram groups
- [ ] Farcaster /base channel
- [ ] Twitter/X with #Base #OnChain
- [ ] Developer Discord servers

---

## 📊 Phase 5: Monitoring & Maintenance

### Day 1-7: Critical Monitoring

Check daily:
- [ ] Transaction success rate (Basescan)
- [ ] User growth (wallet connections)
- [ ] Contract balance (if charging fees)
- [ ] Error reports (Vercel logs)
- [ ] Community feedback

### Week 1: Iterate

Based on feedback:
- [ ] Fix critical bugs immediately
- [ ] Optimize gas costs if needed
- [ ] Add requested features to backlog
- [ ] Update daily themes
- [ ] Engage with early users

### Week 2+: Growth

- [ ] Implement leaderboard indexing (The Graph or custom)
- [ ] Add analytics (Mixpanel/PostHog)
- [ ] Create streak rescue events
- [ ] Partner with other Base projects
- [ ] Weekly dev updates on Farcaster

---

## 🔐 Security Checklist

- [ ] Private key never committed to Git
- [ ] Contract verified on Basescan
- [ ] Test suite passing (100% coverage recommended)
- [ ] Pause function accessible (owner only)
- [ ] Reentrancy guards in place
- [ ] No admin functions exposed to public
- [ ] Rate limiting on API routes (if applicable)

---

## 🆘 Troubleshooting

### Contract deployment fails

```
Error: insufficient funds for gas
```

**Solution**: Get more ETH in your wallet

---

### Verification fails

```
Error: Contract source code already verified
```

**Solution**: Your contract is already verified! Check Basescan.

---

### Frontend can't read contract

```
Error: call revert exception
```

**Solutions**:
1. Check `CONTRACT_ADDRESS` is correct
2. Check `CHAIN_ID` matches network
3. Verify contract is deployed on that network
4. Check RPC URL is working

---

### User wallet won't connect

**Solutions**:
1. Check user has Coinbase Wallet installed
2. Verify CDP_API_KEY is valid
3. Check network is added to wagmi config
4. Try different wallet connector

---

## 📞 Need Help?

- **GitHub Issues**: Open an issue in the repo
- **Base Discord**: Ask in #dev-chat
- **Docs**: https://docs.base.org

---

## ✅ Post-Launch Checklist

After successful deployment:

- [ ] Update README with live contract address
- [ ] Add contract to Base ecosystem list
- [ ] Submit to DappRadar
- [ ] Tweet about launch
- [ ] Thank early testers
- [ ] Plan first community event
- [ ] Schedule daily engagement posts
- [ ] Monitor Builder Score ranking

---

**Congratulations! Your Mini App is live! 🎉**

Now focus on:
1. Daily engagement
2. Community building
3. Feature iterations
4. Climbing the Builder Score rankings

Good luck! 🚀
