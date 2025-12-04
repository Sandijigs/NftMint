# 🚀 Getting Started - Mint of the Day

Welcome! This guide will help you understand what you've received and how to launch your Mini App.

---

## 📦 What's Been Built

You now have a **complete, production-ready Mini App** with:

### ✅ Smart Contracts
- **MintOfTheDay.sol**: Gas-optimized ERC-721 contract with daily minting and streak tracking
- **Full test suite**: 20+ tests covering all functionality
- **Deployment scripts**: Automated deployment to Base Sepolia and Mainnet
- **Hardhat configuration**: Ready for testing and deployment

### ✅ Frontend Application
- **Next.js 14**: Modern React app with App Router
- **Wagmi + Base MiniKit**: Seamless wallet integration with Smart Wallet support
- **Beautiful UI**: Tailwind CSS with responsive design
- **Key pages**: Home, Leaderboard, Farcaster Frame integration
- **Real-time updates**: Contract interaction with live data

### ✅ Documentation
- **README.md**: Complete project overview
- **QUICKSTART.md**: 10-minute setup guide
- **DEPLOYMENT.md**: Step-by-step production deployment
- **GROWTH_STRATEGY.md**: 7-day traction plan
- **COMMANDS.md**: All commands reference
- **PROJECT_SUMMARY.md**: High-level overview

---

## 🎯 Your Mission

**Build a top-ranked Mini App in the Base Top Builders Challenge**

The app is designed to maximize:
- **Daily retention** (streak mechanics)
- **Onchain activity** (every mint = transaction)
- **Open source contributions** (clean, documented code)
- **Social traction** (Farcaster integration)

---

## 📋 Next Steps (Choose Your Path)

### Path A: Quick Test (10 minutes)

Want to see it working immediately?

1. **Follow QUICKSTART.md**
2. Deploy to Base Sepolia testnet
3. Test locally on your machine
4. Mint your first NFT!

```bash
# Quick commands
cd contracts && npm install && npm run deploy:sepolia
cd ../frontend && npm install && npm run dev
# Visit http://localhost:3000
```

### Path B: Full Launch (2-4 hours)

Ready to go to production on Base Mainnet?

1. **Follow DEPLOYMENT.md** completely
2. Deploy contract to Base Mainnet
3. Deploy frontend to Vercel
4. Execute growth strategy from Day 1

### Path C: Learn First (30 minutes)

Want to understand before deploying?

1. Read **PROJECT_SUMMARY.md**
2. Explore the code structure
3. Review smart contract ([contracts/MintOfTheDay.sol](contracts/contracts/MintOfTheDay.sol))
4. Check frontend components ([frontend/components/](frontend/components/))

---

## 🗂️ File Structure Guide

```
base-miniapp/
│
├── 📄 Documentation (Read these!)
│   ├── README.md                 ← Start here for overview
│   ├── QUICKSTART.md             ← 10-min setup
│   ├── DEPLOYMENT.md             ← Production deployment
│   ├── GROWTH_STRATEGY.md        ← Marketing plan
│   ├── COMMANDS.md               ← Command reference
│   └── PROJECT_SUMMARY.md        ← High-level summary
│
├── 📁 contracts/                 ← Smart contracts
│   ├── contracts/MintOfTheDay.sol  ← Main contract
│   ├── scripts/deploy.ts           ← Deploy script
│   ├── test/                       ← Test suite
│   └── package.json
│
└── 📁 frontend/                  ← Next.js app
    ├── app/                        ← Pages
    ├── components/                 ← React components
    ├── lib/                        ← Contract ABI, config
    └── package.json
```

---

## 🎓 Key Concepts

### Daily Minting

Users can mint **exactly one NFT per day** (enforced by smart contract).

**Why?** Creates a daily habit, like Duolingo or Wordle.

### Streak Tracking

Consecutive daily mints build a "streak" (stored onchain).

**Why?** Loss aversion keeps users coming back daily.

### Themes

Each day has a unique visual theme (7 themes rotate).

**Why?** Fresh content prevents monotony.

### Streak Restore

Users can restore a broken streak within 48 hours (small fee).

**Why?** Second chance prevents complete loss, generates revenue.

---

## 💡 How It Works (Technical)

### User Flow

1. User visits app and connects wallet (Smart Wallet supported)
2. App reads current day from contract
3. User sees today's theme and their stats
4. User clicks "Mint Today's NFT"
5. Contract checks:
   - Has user already minted today? (revert if yes)
   - Is streak consecutive? (update accordingly)
6. NFT minted, streak updated, stats displayed
7. User can share on Farcaster

### Smart Contract Logic

```solidity
// Simplified version
mapping(address => MinterData) public minters;

function mintDaily() external {
    uint256 currentDay = getCurrentDay();

    // Check if already minted today
    require(minters[msg.sender].lastMintDay != currentDay);

    // Update streak
    if (minters[msg.sender].lastMintDay == currentDay - 1) {
        minters[msg.sender].currentStreak++; // Consecutive!
    } else {
        minters[msg.sender].currentStreak = 1; // Reset
    }

    // Mint NFT
    _safeMint(msg.sender, tokenId);
}
```

### Frontend Integration

```typescript
// React component using Wagmi
const { writeContract } = useWriteContract();

function handleMint() {
  writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mintDaily',
  });
}
```

---

## 🔑 Key Files to Understand

### Smart Contract

**[contracts/contracts/MintOfTheDay.sol](contracts/contracts/MintOfTheDay.sol)**
- Line 1-50: Contract setup, events, errors
- Line 51-120: Core minting logic (`mintDaily()`)
- Line 121-150: Streak restoration
- Line 151-200: View functions
- Line 201-end: Admin functions

### Frontend Components

**[frontend/components/MintButton.tsx](frontend/components/MintButton.tsx)**
- Handles mint transactions
- Shows loading states
- Displays success/error messages

**[frontend/components/UserStats.tsx](frontend/components/UserStats.tsx)**
- Reads user data from contract
- Displays streaks and badges
- Shows encouragement messages

**[frontend/components/DailyTheme.tsx](frontend/components/DailyTheme.tsx)**
- Shows today's theme
- Countdown timer to next day
- Dynamic gradients

### Configuration

**[frontend/lib/contract.ts](frontend/lib/contract.ts)**
- Contract address
- Contract ABI
- Update this after deployment!

**[frontend/lib/wagmi.ts](frontend/lib/wagmi.ts)**
- Wallet configuration
- Base network setup
- Connector configuration

---

## ⚙️ Configuration Checklist

Before deploying, you'll need:

### For Contracts
- [ ] Private key in `contracts/.env`
- [ ] Basescan API key (for verification)
- [ ] Base Sepolia ETH (from faucet)
- [ ] Base Mainnet ETH (for production)

### For Frontend
- [ ] Contract address in `frontend/.env.local`
- [ ] Coinbase Developer Platform API key
- [ ] Vercel account (for hosting)

All examples provided in `.env.example` files!

---

## 🎯 Success Metrics

Track these weekly:

| Metric | Week 1 | Month 1 |
|--------|--------|---------|
| Total Mints | 200+ | 1000+ |
| Daily Active Users | 50+ | 100+ |
| GitHub Stars | 25+ | 50+ |
| Farcaster Mentions | 100+ | 500+ |

Tools:
- Basescan for transaction data
- GitHub for stars/forks
- Manual tracking for social metrics

---

## 🚨 Common Pitfalls (Avoid These!)

### ❌ DON'T:
- Commit `.env` files to Git (they're gitignored, but be careful!)
- Deploy to mainnet without testing on Sepolia first
- Ignore community feedback in first week
- Skip daily engagement (streaks require daily attention!)
- Forget to verify contract on Basescan

### ✅ DO:
- Test everything on Sepolia before mainnet
- Respond to every comment/question in first week
- Post daily theme updates consistently
- Monitor contract for issues
- Back up your private keys securely

---

## 🆘 Getting Help

### If Stuck:

1. **Check Documentation**
   - Search this repo's markdown files
   - Use `Ctrl+F` to find keywords

2. **Run Diagnostics**
   - `npm test` in contracts directory
   - `npm run type-check` in frontend
   - Check Basescan for transaction errors

3. **Community Resources**
   - Base Discord: #dev-chat
   - Base Telegram: Tag @base
   - Farcaster: /base channel
   - GitHub Issues: Open an issue in your repo

4. **Debug Mode**
   ```bash
   # Frontend console logs
   npm run dev
   # Check browser console (F12)

   # Contract logs
   npx hardhat test --verbose
   ```

---

## 🎁 What Makes This Special

### 1. Complete Package
Most tutorials give you code. This gives you:
- ✅ Working code
- ✅ Deployment scripts
- ✅ Growth strategy
- ✅ Documentation
- ✅ Marketing plan

### 2. Builder Score Optimized
Every feature is designed to maximize metrics:
- Streaks = retention
- Free mints = transaction volume
- Open source = GitHub activity
- Farcaster = social proof

### 3. Production Ready
Not a demo or prototype:
- ✅ Gas optimized
- ✅ Security best practices
- ✅ Error handling
- ✅ Mobile responsive
- ✅ Fully tested

### 4. Beginner Friendly
Frontend developer? No problem:
- ✅ Contract is complete (just deploy)
- ✅ All commands documented
- ✅ Clear explanations
- ✅ Troubleshooting guides

---

## 🏁 Your Launch Timeline

### Today
- [ ] Read this file ✓
- [ ] Read QUICKSTART.md
- [ ] Deploy to Sepolia
- [ ] Test locally

### Tomorrow
- [ ] Read DEPLOYMENT.md
- [ ] Deploy to Base Mainnet
- [ ] Deploy frontend to Vercel
- [ ] Mint your first NFT

### This Week
- [ ] Follow GROWTH_STRATEGY.md
- [ ] Daily theme posts
- [ ] Community engagement
- [ ] Track metrics

### This Month
- [ ] Hit Week 1 targets
- [ ] Iterate based on feedback
- [ ] Add new features
- [ ] Climb Builder Score rankings

---

## 🎊 Final Thoughts

You have everything you need to build a successful Mini App:

✅ **Technical**: Complete, tested code
✅ **Strategy**: Detailed growth plan
✅ **Support**: Comprehensive documentation
✅ **Direction**: Clear next steps

**The only thing missing is your execution.**

---

## 🚀 Ready to Start?

### Absolute Beginner?
Start with: **[QUICKSTART.md](./QUICKSTART.md)**

### Want Full Context?
Start with: **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**

### Ready to Ship?
Start with: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Need Commands?
Reference: **[COMMANDS.md](./COMMANDS.md)**

---

**Good luck with the Base Top Builders Challenge! 🎨💙**

Questions? Check the docs or open a GitHub issue.

Now go build something amazing! 🚀
