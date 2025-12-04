import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
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
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <h1
              style={{
                fontSize: 80,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              ✨ Mint of the Day
            </h1>
            <p
              style={{
                fontSize: 36,
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                marginBottom: 40,
              }}
            >
              Daily NFT minting on Base
            </p>
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
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '30px 50px',
                  borderRadius: 20,
                }}
              >
                <div style={{ fontSize: 50, marginBottom: 10 }}>🔥</div>
                <div style={{ fontSize: 28, color: 'white' }}>Build Streaks</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '30px 50px',
                  borderRadius: 20,
                }}
              >
                <div style={{ fontSize: 50, marginBottom: 10 }}>🎨</div>
                <div style={{ fontSize: 28, color: 'white' }}>Free Mints</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '30px 50px',
                  borderRadius: 20,
                }}
              >
                <div style={{ fontSize: 50, marginBottom: 10 }}>⚡</div>
                <div style={{ fontSize: 28, color: 'white' }}>On Base</div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Image generation error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
