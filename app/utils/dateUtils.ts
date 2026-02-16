import { differenceInSeconds, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export function formatMatchTime(dateString: string, timezone: string = 'Australia/Sydney'): string {
  try {
    const date = parseISO(dateString);
    return formatInTimeZone(date, timezone, 'h:mm a');
  } catch {
    return '';
  }
}

export function formatMatchDate(dateString: string, timezone: string = 'Australia/Sydney'): string {
  try {
    const date = parseISO(dateString);
    return formatInTimeZone(date, timezone, 'EEE, MMM d');
  } catch {
    return '';
  }
}

export function getCountdownParts(targetDate: string, timezone: string = 'Australia/Sydney') {
  try {
    const target = parseISO(targetDate);
    const now = new Date();
    const diff = differenceInSeconds(target, now);

    if (diff <= 0) {
      return null;
    }

    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    return { days, hours, minutes, seconds, totalSeconds: diff };
  } catch {
    return null;
  }
}

export function formatCountdown(parts: { days: number; hours: number; minutes: number; seconds: number }): string {
  if (parts.days > 0) {
    return `${parts.days}d ${parts.hours}h ${parts.minutes}m`;
  }
  if (parts.hours > 0) {
    return `${parts.hours}h ${parts.minutes}m ${parts.seconds}s`;
  }
  return `${parts.minutes}m ${parts.seconds}s`;
}

export function isMatchLive(matchStatus: string): boolean {
  return matchStatus === 'live';
}

export function isMatchUpcoming(matchStatus: string): boolean {
  return matchStatus === 'upcoming';
}

export function isMatchCompleted(matchStatus: string): boolean {
  return matchStatus === 'completed';
}
