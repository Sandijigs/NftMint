# ⚡ Quick Start Guide

Get your Mint of the Day Mini App running in **under 10 minutes**.

## 🎯 What You'll Build

A production-ready NFT minting app where users can:
- Mint one unique NFT per day
- Build consecutive day streaks
- Compete on leaderboards
- Share on Farcaster

## 📋 Prerequisites

```bash
# Check if you have Node.js installed
node --version  # Should be v18 or higher

# Check if you have npm
npm --version   # Should be v9 or higher
```

**Don't have Node.js?** Install from [nodejs.org](https://nodejs.org)

## 🚀 5-Step Setup

### Step 1: Clone & Install (2 min)

```bash
# Clone the repository
git clone https://github.com/yourusername/mint-of-the-day.git
cd mint-of-the-day

# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Get Base Sepolia ETH (2 min)

1. Go to [Coinbase Faucet](https://portal.cdp.coinbase.com/products/faucet)
2. Connect your wallet
3. Request Base Sepolia ETH (free)
4. Wait ~30 seconds for confirmation

### Step 3: Deploy Contract (3 min)

```bash
cd contracts

# Create .env file
cp .env.example .env

# Add your private key (DO NOT SHARE THIS!)
# Edit .env and add:
# PRIVATE_KEY=your_wallet_private_key_without_0x_prefix
nano .env

# Deploy to Base Sepolia
npm run compile
npm run deploy:sepolia
```

**Save the contract address from the output!**

### Step 4: Configure Frontend (1 min)

```bash
cd ../frontend

# Create environment file
cp .env.example .env.local

# Edit .env.local
nano .env.local
```

Add these values:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_FROM_STEP_3
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_CDP_API_KEY=  # Optional for now
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Launch! (1 min)

```bash
# Still in frontend directory
npm run dev
```

**Open your browser**: http://localhost:3000

🎉 **You're live!**

## ✅ Test Your App

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Mint NFT**: Click "Mint Today's NFT"
3. **Approve Transaction**: Confirm in your wallet
4. **Check Stats**: See your streak and badges update

## 🎨 What's Included

### Smart Contract Features
- ✅ Daily minting with 24h cooldown
- ✅ Streak tracking (current & longest)
- ✅ Streak restore (48h grace period)
- ✅ Gas-optimized storage
- ✅ Pausable for emergencies
- ✅ Fully tested (run `npm test`)

### Frontend Features
- ✅ Wallet connection (Coinbase Smart Wallet)
- ✅ Daily theme display with countdown
- ✅ Mint interface with real-time updates
- ✅ User stats dashboard
- ✅ Leaderboard page
- ✅ Farcaster sharing
- ✅ Mobile responsive

## 📱 Next Steps

### Want to deploy to production?

Follow the full [Deployment Guide](./DEPLOYMENT.md)

### Want to customize?

**Change daily themes**: Edit `frontend/lib/themes.ts`

**Update contract parameters**:
```bash
cd contracts/scripts
nano deploy.ts
# Change MINT_PRICE, RESTORE_PRICE, etc.
```

**Customize colors**: Edit `frontend/tailwind.config.ts`

### Want to launch publicly?

Follow the [Growth Strategy](./GROWTH_STRATEGY.md)

## 🔧 Common Issues

### Issue: "Insufficient funds for gas"
**Fix**: Get more Base Sepolia ETH from the faucet

### Issue: "Contract not deployed"
**Fix**: Check you copied the correct contract address to `.env.local`

### Issue: "Cannot connect wallet"
**Fix**: Make sure you're on Base Sepolia network in your wallet

### Issue: "npm install fails"
**Fix**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- [Growth Strategy](./GROWTH_STRATEGY.md) - Marketing & traction
- [Base Docs](https://docs.base.org) - Learn about Base

## 💬 Need Help?

- **GitHub Issues**: [Open an issue](https://github.com/yourusername/mint-of-the-day/issues)
- **Base Discord**: Ask in #dev-chat
- **Farcaster**: Tag @mintoftheday

## 🎯 Your Checklist

- [ ] Contracts installed
- [ ] Frontend installed
- [ ] Got Base Sepolia ETH
- [ ] Contract deployed
- [ ] Frontend configured
- [ ] App running locally
- [ ] First NFT minted
- [ ] Stats displaying correctly

**All checked?** You're ready to ship! 🚀

---

**Time to build**: ~10 minutes
**Time to production**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
**Time to traction**: Follow [GROWTH_STRATEGY.md](./GROWTH_STRATEGY.md)

Happy building! 💙
