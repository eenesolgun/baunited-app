export const timeSince = date => {
  if (!date) {
    return ''; // Handle cases where date is undefined or null
  }

  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = [
    { key: 'y', seconds: 31536000 },
    { key: 'mo.', seconds: 2592000 },
    { key: 'w', seconds: 604800 },
    { key: 'd', seconds: 86400 },
    { key: 'h', seconds: 3600 },
    { key: 'm', seconds: 60 },
    { key: 's', seconds: 1 },
  ];

  let biggestInterval;
  for (const interval of intervals) {
    if (seconds >= interval.seconds) {
      biggestInterval = interval;
      break;
    }
  }

  if (!biggestInterval) return 'Just now';

  const count = Math.floor(seconds / biggestInterval.seconds);
  const timeAgo = count + biggestInterval.key;

  return timeAgo;
};
