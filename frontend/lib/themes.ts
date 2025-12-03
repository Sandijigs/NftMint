// Daily theme generator - creates unique visuals for each day
export interface DailyTheme {
  day: number;
  name: string;
  description: string;
  gradient: string;
  emoji: string;
  color: string;
}

const themes: Omit<DailyTheme, 'day'>[] = [
  {
    name: 'Cosmic Blue',
    description: 'Voyage through the digital cosmos',
    gradient: 'from-blue-600 via-purple-600 to-indigo-700',
    emoji: '🌌',
    color: '#4F46E5',
  },
  {
    name: 'Neon Sunset',
    description: 'Electric dreams in vivid colors',
    gradient: 'from-orange-500 via-pink-500 to-purple-600',
    emoji: '🌆',
    color: '#F59E0B',
  },
  {
    name: 'Forest Dawn',
    description: 'Nature awakens in the blockchain',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    emoji: '🌲',
    color: '#10B981',
  },
  {
    name: 'Arctic Flow',
    description: 'Cool streams of digital ice',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    emoji: '❄️',
    color: '#06B6D4',
  },
  {
    name: 'Ruby Fire',
    description: 'Burning bright on Base',
    gradient: 'from-red-500 via-rose-500 to-pink-600',
    emoji: '🔥',
    color: '#EF4444',
  },
  {
    name: 'Golden Hour',
    description: 'Precious moments onchain',
    gradient: 'from-yellow-400 via-orange-500 to-amber-600',
    emoji: '✨',
    color: '#FBBF24',
  },
  {
    name: 'Midnight Ocean',
    description: 'Deep dive into the network',
    gradient: 'from-slate-700 via-blue-900 to-indigo-900',
    emoji: '🌊',
    color: '#1E40AF',
  },
];

export function getDailyTheme(dayNumber: number): DailyTheme {
  const themeIndex = dayNumber % themes.length;
  return {
    day: dayNumber,
    ...themes[themeIndex],
  };
}

export function getUpcomingThemes(currentDay: number, count: number = 7): DailyTheme[] {
  return Array.from({ length: count }, (_, i) => getDailyTheme(currentDay + i + 1));
}
