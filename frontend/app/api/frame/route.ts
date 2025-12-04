import { NextRequest, NextResponse } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from 'frames.js';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mint-of-the-day.vercel.app';

/**
 * Farcaster Frame API endpoint
 * This creates an interactive Frame for Farcaster
 */

export async function GET(request: NextRequest) {
  // Initial frame - main view
  const frameHtml = getFrameHtmlResponse({
    buttons: [
      {
        label: '✨ Mint Today\'s NFT',
        action: 'link',
        target: APP_URL,
      },
      {
        label: '🏆 Leaderboard',
        action: 'post',
      },
      {
        label: '🔥 My Streak',
        action: 'post',
      },
    ],
    image: {
      src: `${APP_URL}/api/frame/image`,
      aspectRatio: '1.91:1',
    },
    postUrl: `${APP_URL}/api/frame`,
    ogTitle: 'Mint of the Day',
    ogDescription: 'Daily NFT minting on Base. Build your streak! 🔥',
    ogImage: `${APP_URL}/api/frame/image`,
  });

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let message;
    try {
      message = await getFrameMessage(body);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid frame message' }, { status: 400 });
    }

    const buttonIndex = message?.buttonIndex || 1;

    // Button 2: Leaderboard
    if (buttonIndex === 2) {
      const frameHtml = getFrameHtmlResponse({
        buttons: [
          {
            label: '⬅️ Back',
            action: 'post',
          },
          {
            label: '✨ Mint Now',
            action: 'link',
            target: APP_URL,
          },
        ],
        image: {
          src: `${APP_URL}/api/frame/leaderboard`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${APP_URL}/api/frame`,
      });

      return new NextResponse(frameHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    // Button 3: User stats
    if (buttonIndex === 3) {
      const fid = message?.requesterFid || 0;
      const frameHtml = getFrameHtmlResponse({
        buttons: [
          {
            label: '⬅️ Back',
            action: 'post',
          },
          {
            label: '✨ Mint Now',
            action: 'link',
            target: APP_URL,
          },
          {
            label: '🔗 Share',
            action: 'link',
            target: `https://warpcast.com/~/compose?text=I%27m%20building%20my%20NFT%20streak%20on%20Mint%20of%20the%20Day!%20%F0%9F%94%A5&embeds[]=${encodeURIComponent(APP_URL)}`,
          },
        ],
        image: {
          src: `${APP_URL}/api/frame/stats?fid=${fid}`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${APP_URL}/api/frame`,
      });

      return new NextResponse(frameHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    // Default - back to main
    return GET(request);
  } catch (error) {
    console.error('Frame POST error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
