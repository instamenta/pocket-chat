export function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
  );

  const intervals = [
    { seconds: 31536000, unit: 'year' },
    { seconds: 2592000, unit: 'month' },
    { seconds: 86400, unit: 'day' },
    { seconds: 3600, unit: 'hour' },
    { seconds: 60, unit: 'minute' },
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
