'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import Link from 'next/link';
import { getStreakEmoji, formatAddress } from '@/lib/utils';

// This would be fetched from an API or indexed data in production
const mockLeaderboard = [
  { address: '0x1234...5678', streak: 42, total: 42, rank: 1 },
  { address: '0x8765...4321', streak: 35, total: 38, rank: 2 },
  { address: '0xabcd...efgh', streak: 28, total: 30, rank: 3 },
  { address: '0x9876...1234', streak: 21, total: 25, rank: 4 },
  { address: '0x5555...9999', streak: 18, total: 22, rank: 5 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl">🎨</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mint of the Day</h1>
              <p className="text-xs text-gray-600">Leaderboard</p>
            </div>
          </Link>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboard</h2>
          <p className="text-gray-600">Top streak holders on Base</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {mockLeaderboard.slice(0, 3).map((user, idx) => (
            <div
              key={user.address}
              className={`
                rounded-2xl p-6 text-center transform transition-all
                ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 md:-translate-y-4 scale-105' : ''}
                ${idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' : ''}
                ${idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' : ''}
              `}
            >
              <div className="text-5xl mb-2">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </div>
              <div className="text-white font-mono text-sm mb-3">
                {formatAddress(user.address)}
              </div>
              <div className="text-white text-3xl font-bold mb-1">
                {user.streak}
              </div>
              <div className="text-white/90 text-sm">day streak</div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900">All Time Rankings</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {mockLeaderboard.map((user) => (
              <div
                key={user.address}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-gray-600">
                    #{user.rank}
                  </div>
                  <div className="text-2xl">{getStreakEmoji(user.streak)}</div>
                  <div>
                    <div className="font-mono text-sm text-gray-900">
                      {formatAddress(user.address)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.total} total mints
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {user.streak}
                  </div>
                  <div className="text-xs text-gray-600">days</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <p className="text-sm text-blue-900">
            💡 <strong>Pro Tip:</strong> Leaderboard updates every 10 minutes. Keep your streak alive to climb the ranks!
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Start Your Streak
          </Link>
        </div>
      </main>
    </div>
  );
}
