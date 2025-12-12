import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    frame: {
      name: "NFT-Mint",
      version: "1",
      iconUrl: "https://nft-mint-nu-ten.vercel.app/icon-1024.jpg",
      homeUrl: "https://nft-mint-nu-ten.vercel.app",
      imageUrl:
        "https://private-user-images.githubusercontent.com/101811979/523969388-e26a8e5c-dfcf-46aa-88e5-56d2609260a2.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjUyMjk4NjgsIm5iZiI6MTc2NTIyOTU2OCwicGF0aCI6Ii8xMDE4MTE5NzkvNTIzOTY5Mzg4LWUyNmE4ZTVjLWRmY2YtNDZhYS04OGU1LTU2ZDI2MDkyNjBhMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjA4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIwOFQyMTMyNDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNWE3YTJlYmU1NmYwYjkwMDE3NmRmZTZjZDNlYjFmODNiNGFmZTA1Nzc5YWQzOWI3NDQ5YWY3OTNkYWQ0ZjRiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rvFzDWMmTn3McSc-KgshUDmIOrDdSwlzhSmEKHmwXog",
      splashImageUrl: "https://mint-of-the-day.vercel.app/splash-200.png",
      splashBackgroundColor: "#0052FF",
      subtitle: "Daily NFT minting on Base",
      description:
        "Mint one unique themed NFT every day. Build streaks, earn badges, and join the onchain daily ritual on Base.",
      screenshotUrls: [
        "https://private-user-images.githubusercontent.com/101811979/523969388-e26a8e5c-dfcf-46aa-88e5-56d2609260a2.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjUyMjk4NjgsIm5iZiI6MTc2NTIyOTU2OCwicGF0aCI6Ii8xMDE4MTE5NzkvNTIzOTY5Mzg4LWUyNmE4ZTVjLWRmY2YtNDZhYS04OGU1LTU2ZDI2MDkyNjBhMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjA4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIwOFQyMTMyNDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNWE3YTJlYmU1NmYwYjkwMDE3NmRmZTZjZDNlYjFmODNiNGFmZTA1Nzc5YWQzOWI3NDQ5YWY3OTNkYWQ0ZjRiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rvFzDWMmTn3McSc-KgshUDmIOrDdSwlzhSmEKHmwXog",
      ],
      primaryCategory: "games",
      heroImageUrl:
        "https://private-user-images.githubusercontent.com/101811979/523969388-e26a8e5c-dfcf-46aa-88e5-56d2609260a2.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjUyMjk4NjgsIm5iZiI6MTc2NTIyOTU2OCwicGF0aCI6Ii8xMDE4MTE5NzkvNTIzOTY5Mzg4LWUyNmE4ZTVjLWRmY2YtNDZhYS04OGU1LTU2ZDI2MDkyNjBhMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjA4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIwOFQyMTMyNDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNWE3YTJlYmU1NmYwYjkwMDE3NmRmZTZjZDNlYjFmODNiNGFmZTA1Nzc5YWQzOWI3NDQ5YWY3OTNkYWQ0ZjRiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rvFzDWMmTn3McSc-KgshUDmIOrDdSwlzhSmEKHmwXog",
      ogImageUrl: "https://mint-of-the-day.vercel.app/splash-200.png",
    },
    accountAssociation: {
      header:
        "eyJmaWQiOjk3NjM3MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGMxQTFhNTAxNDlCNzUyNDIzMjA3ODlmZDJhOTY4RjRFNWM4NDhGOTMifQ",
      payload: "eyJkb21haW4iOiIifQ",
      signature:
        "CmvVFwgETHw3hrv0aMeUtQlMHW5KsC7TDpSJ6lc7DYJpHjQPWeQK6J4P0ZvRXAusp4lQy5X+4qkCTxp46e683xs=",
    },
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
