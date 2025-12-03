import { NextRequest, NextResponse } from 'next/server';

/**
 * Farcaster Frame API endpoint
 * This creates a Frame that can be embedded in Farcaster casts
 */

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://mint-of-the-day.app';

  // Generate Frame metadata for Farcaster
  const frameHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${url}/api/frame/image" />
    <meta property="fc:frame:button:1" content="Mint Today's NFT" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${url}" />
    <meta property="fc:frame:button:2" content="View Leaderboard" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="${url}/leaderboard" />
    <meta property="og:title" content="Mint of the Day" />
    <meta property="og:description" content="Daily NFT minting on Base. Start your streak today!" />
    <meta property="og:image" content="${url}/og-image.png" />
  </head>
  <body>
    <h1>Mint of the Day</h1>
    <p>Daily NFT minting on Base</p>
  </body>
</html>
  `;

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request: NextRequest) {
  // Handle Frame button interactions
  try {
    const body = await request.json();

    // Here you would validate the Frame signature and handle actions
    // For now, redirect to the app

    const url = process.env.NEXT_PUBLIC_APP_URL || 'https://mint-of-the-day.app';

    return NextResponse.json({
      type: 'frame',
      frameUrl: url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
