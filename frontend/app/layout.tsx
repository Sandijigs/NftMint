import type { Metadata } from 'next'
import { Providers } from '@/lib/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mint of the Day | Daily NFTs on Base',
  description: 'Mint one unique themed NFT every day. Build streaks, earn badges, and join the onchain daily ritual.',
  openGraph: {
    title: 'Mint of the Day',
    description: 'Daily NFT minting on Base - Build your streak!',
    url: 'https://mint-of-the-day.app',
    siteName: 'Mint of the Day',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mint of the Day',
    description: 'Daily NFT minting on Base - Build your streak!',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
