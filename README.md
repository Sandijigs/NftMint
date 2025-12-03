# 🎨 Mint of the Day

> Daily NFT minting on Base with streak tracking and social features

[![Base](https://img.shields.io/badge/Built%20on-Base-0052FF)](https://base.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

**Mint of the Day** is a production-ready Mini App for the Base Top Builders Ranking Challenge. Users can mint one unique themed NFT per day, track consecutive daily streaks, and share their achievements on Farcaster.

### Key Features

- ✅ **Daily Minting**: One unique themed NFT per day (24h cooldown)
- 🔥 **Streak Tracking**: Build consecutive day streaks stored onchain
- 🎨 **Dynamic Themes**: 7 rotating visual themes with unique aesthetics
- 💎 **Streak Badges**: Beginner → Starter → Dedicated → Champion → Legend
- 🔄 **Streak Restore**: 48-hour grace period to save broken streaks
- 📱 **Base MiniKit**: Seamless Smart Wallet integration
- 🚀 **Farcaster Frames**: One-click social sharing
- 🏆 **Leaderboard**: Public ranking of top streak holders

## 📁 Project Structure

```
base-miniapp/
├── contracts/               # Smart contracts & deployment
│   ├── contracts/
│   │   └── MintOfTheDay.sol # Main ERC-721 contract
│   ├── scripts/
│   │   └── deploy.ts        # Deployment script
│   ├── test/
│   │   └── MintOfTheDay.test.ts
│   ├── hardhat.config.ts
│   └── package.json
│
└── frontend/                # Next.js Mini App
    ├── app/
    │   ├── page.tsx         # Home page
    │   ├── leaderboard/
    │   └── api/frame/       # Farcaster Frame API
    ├── components/
    │   ├── ConnectWallet.tsx
    │   ├── DailyTheme.tsx
    │   ├── MintButton.tsx
    │   ├── UserStats.tsx
    │   └── ShareButton.tsx
    ├── lib/
    │   ├── contract.ts      # Contract ABI & address
    │   ├── wagmi.ts         # Wagmi configuration
    │   ├── themes.ts        # Daily theme generator
    │   └── utils.ts
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A wallet with Base Sepolia ETH (get from [Base Sepolia Faucet](https://portal.cdp.coinbase.com/products/faucet))
- Coinbase Developer Platform API key ([Get one here](https://portal.cdp.coinbase.com/))

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/mint-of-the-day.git
cd mint-of-the-day

# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Deploy Smart Contract

```bash
cd contracts

# Copy environment variables
cp .env.example .env

# Edit .env with your private key and Basescan API key
nano .env
```

Add to `.env`:
```bash
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key
```

Deploy to Base Sepolia:
```bash
npm run compile
npm test                    # Run tests first
npm run deploy:sepolia      # Deploy to testnet
```

Save the contract address from deployment output!

### 3. Verify Contract

```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS> \
  "Mint of the Day" \
  "MOTD" \
  0 \
  1000000000000000 \
  "https://mint-of-the-day.app/metadata"
```

### 4. Configure Frontend

```bash
cd frontend

# Copy environment variables
cp .env.example .env.local

# Edit with your contract address
nano .env.local
```

Add to `.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed contract
NEXT_PUBLIC_CHAIN_ID=84532         # Base Sepolia
NEXT_PUBLIC_CDP_API_KEY=your_coinbase_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 📦 Deployment to Production

### Deploy Contract to Base Mainnet

```bash
cd contracts

# Update .env with mainnet RPC if needed
# Make sure your wallet has Base ETH!

npm run deploy:mainnet

# Verify on Basescan
npm run verify:mainnet <CONTRACT_ADDRESS> "Mint of the Day" "MOTD" 0 1000000000000000 "https://mint-of-the-day.app/metadata"
```

### Deploy Frontend (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_CHAIN_ID=8453` (Base Mainnet)
   - `NEXT_PUBLIC_CDP_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy!

## 🎨 Contract Features

### Gas-Optimized Storage

```solidity
struct MinterData {
    uint128 lastMintDay;      // Last mint day number
    uint16 currentStreak;     // Current streak
    uint16 longestStreak;     // Best streak ever
    uint16 totalMints;        // Total NFTs
    uint16 lastBrokenStreak;  // For restore feature
    uint128 streakBrokenDay;  // When streak broke
}
```

### Key Functions

| Function | Description | Cost |
|----------|-------------|------|
| `mintDaily()` | Mint today's NFT | ~80k gas |
| `restoreStreak()` | Restore broken streak (48h window) | 0.001 ETH |
| `getUserStats()` | Get user data | Free (view) |
| `getCurrentDay()` | Get current day number | Free (view) |

### Admin Functions

- `setDailyTheme(day, uri)` - Set custom theme URI
- `setDailyThemesBatch(days[], uris[])` - Batch set themes
- `setMintPrice(price)` - Update mint cost
- `pause()` / `unpause()` - Emergency controls
- `withdraw()` - Withdraw contract balance


