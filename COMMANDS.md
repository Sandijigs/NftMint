# 🛠️ Commands Cheat Sheet

Quick reference for all important commands.

---

## 📦 Installation

```bash
# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd frontend
npm install
```

---

## 🔨 Smart Contract Commands

### Compile

```bash
cd contracts
npm run compile
```

### Test

```bash
# Run all tests
npm test

# Run specific test file
npx hardhat test test/MintOfTheDay.test.ts

# Run with gas reporting
REPORT_GAS=true npm test

# Run with coverage
npx hardhat coverage
```

### Deploy

```bash
# Deploy to Base Sepolia (testnet)
npm run deploy:sepolia

# Deploy to Base Mainnet
npm run deploy:mainnet

# Deploy to local Hardhat network
npx hardhat run scripts/deploy.ts
```

### Verify

```bash
# Verify on Base Sepolia
npm run verify:sepolia <CONTRACT_ADDRESS> "Mint of the Day" "MOTD" 0 1000000000000000 "https://mint-of-the-day.app/metadata"

# Verify on Base Mainnet
npm run verify:mainnet <CONTRACT_ADDRESS> "Mint of the Day" "MOTD" 0 1000000000000000 "https://mint-of-the-day.app/metadata"

# Manual verification
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Interact with Contract

```bash
# Open Hardhat console
npx hardhat console --network baseSepolia

# Example interactions:
# const contract = await ethers.getContractAt("MintOfTheDay", "0xYourAddress");
# await contract.getCurrentDay();
# await contract.mintDaily();
```

### Clean

```bash
# Clean artifacts and cache
npx hardhat clean

# Remove node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## 💻 Frontend Commands

### Development

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Environment Setup

```bash
# Create .env.local from example
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

---

## 🚀 Deployment Commands

### Vercel Deployment

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Manual Build

```bash
# Build static export
npm run build

# Files will be in .next/ directory
```

---

## 🧪 Testing & Quality

### Smart Contract Tests

```bash
cd contracts

# Run all tests
npm test

# Run with verbose output
npx hardhat test --verbose

# Run specific test
npx hardhat test --grep "should allow first daily mint"

# Test coverage
npx hardhat coverage
```

### Frontend Tests (if added)

```bash
cd frontend

# Run tests
npm test

# Run with watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

---

## 📊 Monitoring & Analytics

### Check Contract on Basescan

```bash
# Open in browser
open https://basescan.org/address/<CONTRACT_ADDRESS>

# Sepolia testnet
open https://sepolia.basescan.org/address/<CONTRACT_ADDRESS>
```

### Monitor Transactions

```bash
# Watch contract events
npx hardhat run scripts/watchEvents.ts --network baseSepolia
```

### Gas Reports

```bash
cd contracts
REPORT_GAS=true npm test
```

---

## 🔧 Troubleshooting Commands

### Reset Hardhat Network

```bash
cd contracts
npx hardhat clean
rm -rf cache artifacts
npm run compile
```

### Clear Next.js Cache

```bash
cd frontend
rm -rf .next
npm run build
```

### Fix Node Modules Issues

```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
npm install
```

### Check Network Connection

```bash
# Test RPC endpoint
curl https://sepolia.base.org

# Check account balance
npx hardhat run scripts/checkBalance.ts --network baseSepolia
```

---

## 🔐 Security Commands

### Audit Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (use with caution)
npm audit fix --force
```

### Check Private Key (without exposing it)

```bash
# Verify .env file exists and is not committed
git status

# .env should be in .gitignore
cat .gitignore | grep .env
```

---

## 📝 Git Commands

### Initial Commit

```bash
# Initialize repo
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Mint of the Day MVP"

# Add remote
git remote add origin https://github.com/yourusername/mint-of-the-day.git

# Push to GitHub
git push -u origin main
```

### Daily Commits

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Add: [feature description]"

# Push
git push
```

### Branches

```bash
# Create feature branch
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# Merge feature
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

---

## 🎨 Customization Commands

### Change Contract Parameters

```bash
cd contracts/scripts
nano deploy.ts

# Edit:
# - MINT_PRICE
# - RESTORE_PRICE
# - BASE_URI
# - NAME, SYMBOL
```

### Update Daily Themes

```bash
cd frontend/lib
nano themes.ts

# Add/edit theme objects in the themes array
```

### Customize Colors

```bash
cd frontend
nano tailwind.config.ts

# Edit theme.extend.colors
```

---

## 📤 Admin Functions (After Deployment)

### Set Daily Theme

```bash
# Create script
cd contracts
npx hardhat run scripts/setTheme.ts --network base
```

Example `setTheme.ts`:
```typescript
const contract = await ethers.getContractAt("MintOfTheDay", "0xYourAddress");
await contract.setDailyTheme(0, "ipfs://QmYourThemeURI");
```

### Pause/Unpause Contract

```bash
# Pause
await contract.pause();

# Unpause
await contract.unpause();
```

### Update Prices

```bash
# Update mint price
await contract.setMintPrice(ethers.parseEther("0.001"));

# Update restore price
await contract.setRestorePrice(ethers.parseEther("0.002"));
```

### Withdraw Funds

```bash
# Withdraw contract balance
await contract.withdraw();
```

---

## 📊 Analytics Commands

### Count Total Mints

```bash
# Use Basescan API or create script
npx hardhat run scripts/getTotalSupply.ts --network base
```

### Get Top Streaks

```bash
# Create custom script with The Graph or direct reads
npx hardhat run scripts/getLeaderboard.ts --network base
```

---

## 🔄 Update Commands

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all to latest
npm update

# Update specific package
npm install wagmi@latest
```

### Update Vercel Deployment

```bash
# Trigger new deployment
vercel --prod

# Or push to GitHub (if auto-deploy enabled)
git push origin main
```

---

## 🆘 Emergency Commands

### Pause Contract (Emergency)

```bash
cd contracts
npx hardhat console --network base

# In console:
const contract = await ethers.getContractAt("MintOfTheDay", "0xYourAddress");
await contract.pause();
```

### Rollback Frontend

```bash
# In Vercel dashboard or CLI
vercel rollback <DEPLOYMENT_URL>
```

---

## 📋 Pre-Launch Checklist Commands

```bash
# 1. Compile contracts
cd contracts && npm run compile

# 2. Run tests
npm test

# 3. Deploy to Sepolia
npm run deploy:sepolia

# 4. Build frontend
cd ../frontend && npm run build

# 5. Type check
npm run type-check

# 6. Lint
npm run lint

# 7. Test locally
npm run dev

# 8. Deploy frontend
vercel --prod

# 9. Verify contract
cd ../contracts && npm run verify:sepolia <ADDRESS> <ARGS>
```

---

## 💡 Useful One-Liners

```bash
# Get current day number
cast call <CONTRACT_ADDRESS> "getCurrentDay()" --rpc-url https://mainnet.base.org

# Get user stats
cast call <CONTRACT_ADDRESS> "getUserStats(address)" <USER_ADDRESS> --rpc-url https://mainnet.base.org

# Check mint price
cast call <CONTRACT_ADDRESS> "mintPrice()" --rpc-url https://mainnet.base.org

# Monitor new mints (requires cast)
cast logs <CONTRACT_ADDRESS> "DailyMint(address,uint256,uint256,uint16,uint16)" --rpc-url https://mainnet.base.org --follow
```

---

## 🔗 Quick Links

```bash
# Open local dev
open http://localhost:3000

# Open Basescan
open https://basescan.org/address/<CONTRACT_ADDRESS>

# Open GitHub repo
open https://github.com/yourusername/mint-of-the-day

# Open Vercel deployment
open https://mint-of-the-day.vercel.app
```

---

**Bookmark this file!** You'll reference it often during development and deployment.

Need more help? Check [README.md](./README.md) or [DEPLOYMENT.md](./DEPLOYMENT.md).
