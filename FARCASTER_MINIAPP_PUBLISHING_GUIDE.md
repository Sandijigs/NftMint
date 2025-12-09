# 🚀 Complete Guide: Publishing Your Mini App on Farcaster

## ✅ What I've Done For You

1. ✅ Created manifest file at `frontend/public/.well-known/farcaster.json`
2. ✅ Configured all Mini App metadata
3. ✅ Set up proper directory structure

## 📋 Step-by-Step Publishing Process

### **STEP 1: Create Required Images** (10 mins)

You need 2 images for your Mini App:

#### A. App Icon (1024x1024px PNG)
- **File**: `frontend/public/icon-1024.png`
- **Size**: 1024x1024 pixels
- **Format**: PNG
- **Content**: Your app logo/icon

#### B. Splash Screen (200x200px PNG)
- **File**: `frontend/public/splash-200.png`
- **Size**: 200x200 pixels
- **Format**: PNG
- **Content**: Simplified version of your icon

**How to create these:**
1. Use Figma, Canva, or any design tool
2. Create a square design with your app branding
3. Export as PNG at exact sizes
4. Save to `frontend/public/` folder

**Quick tip:** You can use the same design for both, just resize it!

---

### **STEP 2: Generate Account Association** (5 mins)

This cryptographically proves you own the app.

1. **Go to Warpcast Developer Tools**:
   - Visit: https://warpcast.com/~/developers/new
   - Sign in with your Farcaster account

2. **Enter Your Domain**:
   - Domain: `mint-of-the-day.vercel.app`
   - **IMPORTANT**: No `https://` or `/` - just the domain!

3. **Generate Association**:
   - Click "Generate Account Association"
   - Copy the generated JSON object

4. **Update Manifest**:
   - Open: `frontend/public/.well-known/farcaster.json`
   - Replace the `accountAssociation` section with what you copied:
   ```json
   "accountAssociation": {
     "header": "eyJma...real_base64_data",
     "payload": "eyJkb2...real_base64_data",
     "signature": "MHg2Z...real_base64_signature"
   }
   ```

---

### **STEP 3: Deploy to Production** (5 mins)

The manifest file must be accessible at:
`https://mint-of-the-day.vercel.app/.well-known/farcaster.json`

**Deploy now:**
```bash
# Terminal
cd /Users/idjighereoghenerukevwesandra/Desktop/base-miniapp/frontend
vercel --prod
```

OR

Go to Vercel Dashboard → Your Project → Redeploy

---

### **STEP 4: Verify Manifest is Live** (2 mins)

After deployment, check that your manifest is accessible:

1. Visit in browser:
   ```
   https://mint-of-the-day.vercel.app/.well-known/farcaster.json
   ```

2. You should see your JSON manifest with:
   - ✅ Your account association (real base64 data, not placeholders)
   - ✅ App name: "Mint of the Day"
   - ✅ All metadata fields

---

### **STEP 5: Test Your Mini App** (5 mins)

1. **Open Warpcast** (mobile or https://warpcast.com)

2. **Create a test cast** with your URL:
   ```
   Testing my new Mini App!

   https://mint-of-the-day.vercel.app
   ```

3. **Your app should appear** as an embedded Mini App with:
   - Your icon
   - App name
   - "Open" button

4. **Click "Open"** - it should launch your app!

---

### **STEP 6: Submit to App Store** (Optional - 5 mins)

Once published, your Mini App can appear in Farcaster's App Store for discovery.

1. Go to Warpcast Developer Tools
2. Your verified app should automatically be eligible
3. Wait for it to appear in the App Store (can take 24-48 hours)

---

## 🔧 Troubleshooting

### Problem: "Manifest not found"
**Solution**:
- Check URL is exactly: `https://mint-of-the-day.vercel.app/.well-known/farcaster.json`
- Verify file is in `public/.well-known/` folder
- Redeploy to Vercel

### Problem: "Invalid account association"
**Solution**:
- Domain in Warpcast tool must EXACTLY match: `mint-of-the-day.vercel.app`
- No `https://`, no `/`, no paths
- Regenerate if needed

### Problem: "Icon not loading"
**Solution**:
- Verify images are in `public/` folder
- Check URLs are accessible:
  - `https://mint-of-the-day.vercel.app/icon-1024.png`
  - `https://mint-of-the-day.vercel.app/splash-200.png`

### Problem: "Mini App not appearing in cast"
**Solution**:
- Wait 1-2 minutes after posting (caching)
- Try in Warpcast mobile app
- Verify manifest is valid JSON

---

## 📝 Current Manifest Configuration

Your manifest is already configured with:

```json
{
  "miniapp": {
    "version": "1",
    "name": "Mint of the Day",
    "homeUrl": "https://mint-of-the-day.vercel.app",
    "subtitle": "Daily NFT minting on Base",
    "description": "Mint one unique themed NFT every day...",
    "primaryCategory": "lifestyle",
    "tags": ["nft", "base", "daily", "streak", "collectibles"],
    "requiredChains": [8453]
  }
}
```

You only need to add the `accountAssociation` from Warpcast!

---

## ✅ Checklist

Before going live, make sure you have:

- [ ] Created icon-1024.png (1024x1024px)
- [ ] Created splash-200.png (200x200px)
- [ ] Generated account association from Warpcast
- [ ] Updated farcaster.json with real account association
- [ ] Deployed to Vercel production
- [ ] Verified manifest is accessible at URL
- [ ] Tested in a Warpcast cast
- [ ] Mini App opens correctly

---

## 🎯 After Publishing

### Promote Your Mini App:

1. **Share in /base channel**:
   ```
   🎨 Just published Mint of the Day as a Farcaster Mini App!

   Mint directly from Warpcast - no leaving the app
   Build your NFT streak on @base

   Try it: https://mint-of-the-day.vercel.app
   ```

2. **Share in /miniapps channel**:
   ```
   New Mini App: Mint of the Day 🎨

   Daily NFT minting with streak tracking
   Native Farcaster integration
   Free mints on @base

   https://mint-of-the-day.vercel.app
   ```

3. **Tweet**:
   ```
   Just published my first @farcaster Mini App!

   Mint of the Day - daily NFT minting on @base

Now live: https://mint-of-the-day.vercel.app

   #Farcaster #BuildOnBase
   ```

---

## 💰 Developer Rewards

Verified Mini Apps are **automatically eligible for Warpcast Developer Rewards**!

Track your metrics:
- Daily Active Users (DAU)
- Engagement rate
- Retention rate

Higher usage = higher rewards! 🎊

---

## 🆘 Need Help?

- **Farcaster Docs**: https://miniapps.farcaster.xyz/docs
- **Developer Discord**: Join Farcaster dev community
- **Warpcast Support**: https://warpcast.com/~/support

---

## 🎉 You're Almost There!

Just 3 steps left:
1. Create the 2 icon images
2. Generate account association
3. Deploy!

Your Mini App will be live on Farcaster! 🚀
