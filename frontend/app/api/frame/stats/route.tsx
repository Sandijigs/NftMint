import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid') || '0';

    // In production, fetch real user stats from contract based on FID
    // For now, use mock data
    const userStats = {
      currentStreak: 15,
      longestStreak: 28,
      totalMints: 45,
      canMint: true,
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0052FF',
            backgroundImage: 'linear-gradient(135deg, #0052FF 0%, #7B3FF2 100%)',
            padding: 60,
          }}
        >
          <h1
            style={{
              fontSize: 70,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 50,
            }}
          >
            🔥 Your Streak Stats
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 40,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '40px 60px',
                borderRadius: 20,
                minWidth: 250,
              }}
            >
              <div style={{ fontSize: 90, fontWeight: 'bold', color: 'white' }}>
                {userStats.currentStreak}
              </div>
              <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.9)', marginTop: 10 }}>
                Current Streak
              </div>
              <div style={{ fontSize: 60, marginTop: 10 }}>🔥</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '40px 60px',
                borderRadius: 20,
                minWidth: 250,
              }}
            >
              <div style={{ fontSize: 90, fontWeight: 'bold', color: 'white' }}>
                {userStats.longestStreak}
              </div>
              <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.9)', marginTop: 10 }}>
                Longest Streak
              </div>
              <div style={{ fontSize: 60, marginTop: 10 }}>🏆</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '40px 60px',
                borderRadius: 20,
                minWidth: 250,
              }}
            >
              <div style={{ fontSize: 90, fontWeight: 'bold', color: 'white' }}>
                {userStats.totalMints}
              </div>
              <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.9)', marginTop: 10 }}>
                Total Mints
              </div>
              <div style={{ fontSize: 60, marginTop: 10 }}>✨</div>
            </div>
          </div>
          {userStats.canMint && (
            <div
              style={{
                marginTop: 50,
                fontSize: 36,
                color: 'rgba(255,255,255,0.9)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '20px 40px',
                borderRadius: 15,
              }}
            >
              ✅ Ready to mint today!
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Stats image error:', e);
    return new Response('Failed to generate stats', { status: 500 });
  }
}
