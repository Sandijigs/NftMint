'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { DailyTheme } from '@/components/DailyTheme';
import { MintButton } from '@/components/MintButton';
import { UserStats } from '@/components/UserStats';
import { ShareButton } from '@/components/ShareButton';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎨</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mint of the Day</h1>
              <p className="text-xs text-gray-600">Daily NFTs on Base</p>
            </div>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Daily Theme & Minting */}
          <div className="space-y-6">
            <DailyTheme />

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                Today's Mint
              </h2>
              <MintButton />
              <ShareButton />
            </div>

            {/* How It Works */}
            {!isConnected && (
              <div className="bg-blue-50 rounded-xl p-6 space-y-3">
                <h3 className="font-bold text-blue-900">How It Works</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-lg">1️⃣</span>
                    <span>Connect your wallet (Smart Wallet supported)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">2️⃣</span>
                    <span>Mint one NFT per day with today's unique theme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">3️⃣</span>
                    <span>Build your streak by minting consecutively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">4️⃣</span>
                    <span>Earn badges and climb the leaderboard</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - User Stats */}
          <div className="space-y-6">
            {isConnected ? (
              <>
                <UserStats />

                {/* Quick Links */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Explore</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/leaderboard"
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                    >
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="text-sm font-medium text-gray-900">Leaderboard</div>
                    </Link>
                    <Link
                      href="/gallery"
                      className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                    >
                      <div className="text-2xl mb-1">🖼️</div>
                      <div className="text-sm font-medium text-gray-900">My Gallery</div>
                    </Link>
                  </div>
                </div>

                {/* Community */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Join the Community</h3>
                  <div className="space-y-2">
                    <a
                      href="https://warpcast.com/~/channel/base"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span>💬</span>
                      <span>Follow on Farcaster</span>
                    </a>
                    <a
                      href="https://github.com/your-repo/mint-of-the-day"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <span>⭐</span>
                      <span>Star on GitHub</span>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">👋</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome!
                </h3>
                <p className="text-gray-600 mb-6">
                  Connect your wallet to start your daily minting journey
                </p>
                <ConnectWallet />
              </div>
            )}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">🎨</div>
              <div className="text-sm opacity-90 mt-1">Daily Unique Themes</div>
            </div>
            <div>
              <div className="text-3xl font-bold">🔥</div>
              <div className="text-sm opacity-90 mt-1">Track Your Streaks</div>
            </div>
            <div>
              <div className="text-3xl font-bold">⛓️</div>
              <div className="text-sm opacity-90 mt-1">100% Onchain</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Built with 💙 for the{' '}
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Base Top Builders Challenge
            </a>
          </p>
          <p className="mt-2">
            <a
              href="https://github.com/your-repo/mint-of-the-day"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              Open Source on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
