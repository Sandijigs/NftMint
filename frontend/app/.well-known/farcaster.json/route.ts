import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    frame: {
      name: "Mint of the Day",
      version: "1",
      iconUrl: "https://nft-mint-nu-ten.vercel.app/icon-1024.jpg",
      homeUrl: "https://nft-mint-nu-ten.vercel.app",
      buttonTitle: "connect wallet",
      subtitle: "Daily NFT minting on Bas",
      description:
        "Mint one unique themed NFT every day. Build streaks, earn badges, and join the onchain daily ritual on Base.",
      primaryCategory: "social",
      tags: ["nft", "base", "daily", "streak", "collectables"],
    },
    accountAssociation: {
      header:
        "eyJmaWQiOjk3NjM3MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGMxQTFhNTAxNDlCNzUyNDIzMjA3ODlmZDJhOTY4RjRFNWM4NDhGOTMifQ",
      payload: "eyJkb21haW4iOiJtaW50LW9mLXRoZS1kYXkudmVyY2VsLmFwcCJ9",
      signature:
        "EeESdjQQquqcqnHRbIa6pAcZ9bJFYQgIeetXx4Mrh/8Nkyu061p+S8vYD8YO4U6TsZkVBjQY2coG8N/kKO2X+Bw=",
    },
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
