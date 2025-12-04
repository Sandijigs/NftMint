import { NextRequest, NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mint-of-the-day.vercel.app';

/**
 * Farcaster Frame API endpoint
 * Creates an interactive Frame for Farcaster
 */

export async function GET() {
  // Initial frame - main view
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${APP_URL}/api/frame/image" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:button:1" content="✨ Mint Today's NFT" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${APP_URL}" />
    <meta property="fc:frame:button:2" content="🏆 Leaderboard" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:button:3" content="🔥 My Streak" />
    <meta property="fc:frame:button:3:action" content="post" />
    <meta property="fc:frame:post_url" content="${APP_URL}/api/frame" />
    <meta property="og:title" content="Mint of the Day" />
    <meta property="og:description" content="Daily NFT minting on Base. Build your streak! 🔥" />
    <meta property="og:image" content="${APP_URL}/api/frame/image" />
  </head>
  <body>
    <h1>Mint of the Day</h1>
    <p>Daily NFT minting on Base</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonIndex = body?.untrustedData?.buttonIndex || 1;

    // Button 2: Leaderboard
    if (buttonIndex === 2) {
      const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${APP_URL}/api/frame/leaderboard" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:button:1" content="⬅️ Back" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:2" content="✨ Mint Now" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="${APP_URL}" />
    <meta property="fc:frame:post_url" content="${APP_URL}/api/frame" />
  </head>
  <body>Leaderboard</body>
</html>`;
      return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Button 3: User stats
    if (buttonIndex === 3) {
      const fid = body?.untrustedData?.fid || 0;
      const shareUrl = `https://warpcast.com/~/compose?text=I'm building my NFT streak on Mint of the Day! 🔥&embeds[]=${encodeURIComponent(APP_URL)}`;

      const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${APP_URL}/api/frame/stats?fid=${fid}" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:button:1" content="⬅️ Back" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:2" content="✨ Mint Now" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="${APP_URL}" />
    <meta property="fc:frame:button:3" content="🔗 Share" />
    <meta property="fc:frame:button:3:action" content="link" />
    <meta property="fc:frame:button:3:target" content="${shareUrl}" />
    <meta property="fc:frame:post_url" content="${APP_URL}/api/frame" />
  </head>
  <body>Your Stats</body>
</html>`;
      return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Default - back to main
    return GET();
  } catch (error) {
    console.error('Frame POST error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
