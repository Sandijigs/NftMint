'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { getStreakEmoji, getStreakBadge, formatStreak } from '@/lib/utils';

export function UserStats() {
  const { address, isConnected } = useAccount();

  const { data: userStats } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserStats',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  if (!isConnected || !userStats) {
    return null;
  }

  const [lastMintDay, currentStreak, longestStreak, totalMints, canMint, canRestore] = userStats;

  const streakNumber = Number(currentStreak);
  const badge = getStreakBadge(streakNumber);
  const emoji = getStreakEmoji(streakNumber);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      {/* Current Streak */}
      <div className="text-center">
        <div className="text-6xl mb-2">{emoji}</div>
        <div className="text-4xl font-bold text-gray-900 mb-1">
          {streakNumber}
        </div>
        <div className="text-sm text-gray-600 uppercase tracking-wider">
          Day Streak
        </div>
        <div className={`streak-badge ${badge.toLowerCase()} mt-3`}>
          {badge}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">
            {Number(longestStreak)}
          </div>
          <div className="text-xs text-gray-600 mt-1">Longest Streak</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">
            {Number(totalMints)}
          </div>
          <div className="text-xs text-gray-600 mt-1">Total Mints</div>
        </div>
      </div>

      {/* Restore Streak Option */}
      {canRestore && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-900">
                Streak Broken!
              </p>
              <p className="text-xs text-orange-700 mt-1">
                You can restore your streak within 48 hours
              </p>
              <button className="mt-2 px-3 py-1 bg-orange-600 text-white text-xs rounded-lg hover:bg-orange-700 transition-colors">
                Restore Streak (0.001 ETH)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encouragement Messages */}
      {streakNumber === 0 && (
        <div className="text-center text-sm text-gray-500">
          Start your streak today! 🌱
        </div>
      )}

      {streakNumber > 0 && streakNumber < 7 && (
        <div className="text-center text-sm text-gray-600">
          Keep going! {7 - streakNumber} more days to reach Dedicated status 🎯
        </div>
      )}

      {streakNumber >= 7 && streakNumber < 30 && (
        <div className="text-center text-sm text-gray-600">
          Amazing! {30 - streakNumber} more days to become a Champion 💪
        </div>
      )}

      {streakNumber >= 30 && streakNumber < 100 && (
        <div className="text-center text-sm text-gray-600">
          Incredible! {100 - streakNumber} more days to Legend status 👑
        </div>
      )}

      {streakNumber >= 100 && (
        <div className="text-center text-sm font-medium text-purple-600">
          You're a Legend! Keep the streak alive 👑
        </div>
      )}
    </div>
  );
}
