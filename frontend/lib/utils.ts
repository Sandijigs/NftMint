export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatStreak(streak: number): string {
  if (streak === 0) return 'No streak yet';
  if (streak === 1) return '1 day';
  return `${streak} days`;
}

export function getStreakEmoji(streak: number): string {
  if (streak === 0) return '🌱';
  if (streak < 7) return '🔥';
  if (streak < 30) return '⚡';
  if (streak < 100) return '💎';
  return '👑';
}

export function getStreakBadge(streak: number): string {
  if (streak === 0) return 'Beginner';
  if (streak < 7) return 'Starter';
  if (streak < 30) return 'Dedicated';
  if (streak < 100) return 'Champion';
  return 'Legend';
}

export function getDayOfWeek(dayNumber: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // Approximate - for display purposes
  return days[dayNumber % 7];
}

export function shareOnFarcaster(streak: number, dayNumber: number): string {
  const text = `Just minted Day ${dayNumber} on Mint of the Day! 🎨\n\nCurrent streak: ${streak} ${getStreakEmoji(streak)}\n\nJoin me onchain!`;
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://mint-of-the-day.app';
  return `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`;
}

export function formatEther(value: bigint, decimals: number = 4): string {
  const eth = Number(value) / 1e18;
  return eth.toFixed(decimals);
}
