# ⚡ Quick Publishing Steps

## 🎯 3 Simple Steps to Go Live

### 1️⃣ Create Images (10 mins)
```
frontend/public/icon-1024.png     (1024x1024px)
frontend/public/splash-200.png    (200x200px)
```
Use any design tool, export as PNG, save to `public/` folder.

### 2️⃣ Get Account Association (5 mins)
1. Go to: **https://warpcast.com/~/developers/new**
2. Enter domain: `mint-of-the-day.vercel.app`
3. Click "Generate"
4. Copy the JSON
5. Replace `accountAssociation` in `frontend/public/.well-known/farcaster.json`

### 3️⃣ Deploy (5 mins)
```bash
cd frontend
vercel --prod
```

## ✅ Verify
Visit: `https://mint-of-the-day.vercel.app/.well-known/farcaster.json`

Should show your manifest with real data (not PLACEHOLDER).

## 🧪 Test
Create a cast in Warpcast with:
```
https://mint-of-the-day.vercel.app
```

Your Mini App should appear embedded!

## 🎊 Done!
Your Mini App is now live on Farcaster!

---

**Full Guide**: See `FARCASTER_MINIAPP_PUBLISHING_GUIDE.md`
