import { COUNTDOWN_UPDATE_INTERVAL } from "@/utils/constants";
import { getTimeDifference } from "@/utils/dateUtils";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownResult {
  timeLeft: number;
  isExpired: boolean;
  formattedTime: string;
}

/**
 * Hook for countdown timer
 * Optimized to prevent unnecessary re-renders
 */
export const useCountdown = (targetDate: string): UseCountdownResult => {
  const [timeLeft, setTimeLeft] = useState<number>(() =>
    getTimeDifference(targetDate),
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const updateTimer = useCallback(() => {
    if (!mountedRef.current) return;

    const difference = getTimeDifference(targetDate);

    if (difference <= 0) {
      setTimeLeft(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setTimeLeft(difference);
    }
  }, [targetDate]);

  useEffect(() => {
    mountedRef.current = true;

    // Initial update
    updateTimer();

    // Only start interval if time is left
    if (timeLeft > 0) {
      intervalRef.current = setInterval(updateTimer, COUNTDOWN_UPDATE_INTERVAL);
    }

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate, updateTimer]);

  const formatTime = useCallback((seconds: number): string => {
    if (seconds <= 0) return "Started";

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }, []);

  return {
    timeLeft,
    isExpired: timeLeft <= 0,
    formattedTime: formatTime(timeLeft),
  };
};
