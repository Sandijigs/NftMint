'use client';

import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { getDailyTheme } from '@/lib/themes';
import { useEffect, useState } from 'react';

export function DailyTheme() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: currentDay } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCurrentDay',
  });

  if (!mounted || currentDay === undefined) {
    return (
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-8 animate-pulse">
        <div className="h-64" />
      </div>
    );
  }

  const dayNumber = Number(currentDay);
  const theme = getDailyTheme(dayNumber);

  return (
    <div className={`bg-gradient-to-br ${theme.gradient} rounded-2xl p-8 shadow-xl`}>
      <div className="text-center space-y-4">
        {/* Theme Emoji */}
        <div className="text-8xl animate-bounce-slow">{theme.emoji}</div>

        {/* Day Number */}
        <div className="space-y-1">
          <div className="text-white/80 text-sm uppercase tracking-wider font-medium">
            Day {dayNumber}
          </div>
          <div className="text-white text-3xl font-bold">{theme.name}</div>
        </div>

        {/* Description */}
        <div className="text-white/90 text-sm max-w-md mx-auto">
          {theme.description}
        </div>

        {/* Countdown Timer */}
        <TimeUntilNext />
      </div>
    </div>
  );
}

function TimeUntilNext() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
      <div className="text-white/80 text-xs uppercase tracking-wider mb-1">
        Next theme in
      </div>
      <div className="text-white font-mono text-lg font-bold">{timeLeft || '...'}</div>
    </div>
  );
}
