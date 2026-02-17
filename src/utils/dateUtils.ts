import {
  differenceInSeconds,
  format,
  formatDistanceToNow,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

/**
 * Format date for display
 */
export const formatDate = (
  date: string | Date,
  formatString: string = "MMM dd, yyyy",
): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Format time for display
 */
export const formatTime = (
  date: string | Date,
  formatString: string = "HH:mm",
): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatString);
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
};

/**
 * Format date and time for display
 */
export const formatDateTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, "MMM dd, yyyy HH:mm");
  } catch (error) {
    console.error("Error formatting datetime:", error);
    return "Invalid datetime";
  }
};

/**
 * Convert date to timezone
 */
export const convertToTimezone = (
  date: string | Date,
  timezone: string,
): Date => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return toZonedTime(dateObj, timezone);
  } catch (error) {
    console.error("Error converting timezone:", error);
    return new Date();
  }
};

/**
 * Get time difference in seconds
 */
export const getTimeDifference = (targetDate: string | Date): number => {
  try {
    const target =
      typeof targetDate === "string" ? parseISO(targetDate) : targetDate;
    const now = new Date();
    return differenceInSeconds(target, now);
  } catch (error) {
    console.error("Error calculating time difference:", error);
    return 0;
  }
};

/**
 * Check if match has started
 */
export const hasMatchStarted = (matchTime: string | Date): boolean => {
  try {
    const target =
      typeof matchTime === "string" ? parseISO(matchTime) : matchTime;
    return isBefore(target, new Date());
  } catch (error) {
    console.error("Error checking match start:", error);
    return false;
  }
};

/**
 * Check if match is upcoming
 */
export const isMatchUpcoming = (matchTime: string | Date): boolean => {
  try {
    const target =
      typeof matchTime === "string" ? parseISO(matchTime) : matchTime;
    return isAfter(target, new Date());
  } catch (error) {
    console.error("Error checking match upcoming:", error);
    return false;
  }
};

/**
 * Format countdown display
 */
export const formatCountdown = (seconds: number): string => {
  if (seconds <= 0) return "Started";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error("Error getting relative time:", error);
    return "Unknown";
  }
};

/**
 * Format date for API
 */
export const formatDateForAPI = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

/**
 * Group matches by date
 */
export const groupMatchesByDate = <T extends { matchTime: string }>(
  matches: T[],
): Map<string, T[]> => {
  const grouped = new Map<string, T[]>();

  matches.forEach((match) => {
    const dateKey = formatDate(match.matchTime, "yyyy-MM-dd");
    const existing = grouped.get(dateKey) || [];
    grouped.set(dateKey, [...existing, match]);
  });

  return grouped;
};
