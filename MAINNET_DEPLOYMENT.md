# 🚀 Base Mainnet Deployment

## Contract Details

**Network:** Base Mainnet (Chain ID: 8453)
**Contract Address:** `0xfee2B3154eA75bA762601e816EDbaBb75920Fa47`
**Deployer:** `0xeEA4353FE0641fA7730e1c9Bc7cC0f969ECd5914`
**Deployment Date:** December 3, 2025
**Deployment Day:** 20425

## Contract Configuration

- **Name:** Mint of the Day
- **Symbol:** MOTD
- **Mint Price:** 0.0 ETH (FREE)
- **Restore Price:** 0.001 ETH
- **Base URI:** https://mint-of-the-day.app/metadata

## Links

- **Basescan:** https://basescan.org/address/0xfee2B3154eA75bA762601e816EDbaBb75920Fa47
- **Contract Verification:** Pending
- **Frontend:** http://localhost:3000 (to be deployed)

## Frontend Configuration

The frontend `.env.local` has been updated to use mainnet:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xfee2B3154eA75bA762601e816EDbaBb75920Fa47
NEXT_PUBLIC_CHAIN_ID=8453
```

## Test the Contract

You can now test minting on Base Mainnet! Connect your wallet and mint your first NFT.

**Important Notes:**
- This is REAL mainnet deployment
- Transactions use REAL ETH (though minting is free, you pay gas)
- NFTs are REAL onchain assets

## What's Next?

1. ✅ Contract deployed to Base Mainnet
2. ✅ Frontend configured for mainnet
3. ⏳ Deploy frontend to production (Vercel/Netlify)
4. ⏳ Build Farcaster Frame integration
5. ⏳ Launch and promote on social media
