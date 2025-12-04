import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    // In production, fetch real leaderboard data from contract
    const mockLeaderboard = [
      { address: '0x1234...5678', streak: 42, rank: 1 },
      { address: '0xabcd...ef01', streak: 35, rank: 2 },
      { address: '0x9876...5432', streak: 28, rank: 3 },
      { address: '0xdef0...1234', streak: 21, rank: 4 },
      { address: '0x5678...90ab', streak: 14, rank: 5 },
    ];

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
              marginBottom: 40,
            }}
          >
            🏆 Top Streaks
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              width: '100%',
              maxWidth: 900,
            }}
          >
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '25px 40px',
                  borderRadius: 15,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                  <span style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }}>
                    #{entry.rank}
                  </span>
                  <span style={{ fontSize: 36, color: 'rgba(255,255,255,0.9)' }}>
                    {entry.address}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <span style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                    {entry.streak}
                  </span>
                  <span style={{ fontSize: 50 }}>🔥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Leaderboard image error:', e);
    return new Response('Failed to generate leaderboard', { status: 500 });
  }
}
