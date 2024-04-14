import { T_MutualFriend } from '@/lib/types';

export function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const intervals = [
    { seconds: 31536000, unit: 'year' },
    { seconds: 2592000, unit: 'month' },
    { seconds: 86400, unit: 'day' },
    { seconds: 3600, unit: 'hour' },
    { seconds: 60, unit: 'minute' }
  ];

  for (const { seconds: intervalSeconds, unit } of intervals) {
    const interval = seconds / intervalSeconds;
    if (interval >= 1) {
      const roundedInterval = Math.floor(interval);
      return `${roundedInterval} ${unit}${roundedInterval > 1 ? 's' : ''} ago`;
    }
  }

  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

export function formatCount(count: number) {
  if (!count) return '0';
  switch (true) {
    case count < 1000:
      return count.toString();
    case count < 1000000:
      return (count / 1000).toFixed(1) + 'K';
    default:
      return (count / 1000000).toFixed(1) + 'M';
  }
}
