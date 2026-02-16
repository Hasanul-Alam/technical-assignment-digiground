import { useCallback, useEffect, useRef, useState } from 'react';
import { formatCountdown, getCountdownParts } from '../utils/dateUtils';

interface CountdownResult {
  display: string;
  isExpired: boolean;
  parts: { days: number; hours: number; minutes: number; seconds: number } | null;
}

export const useCountdown = (targetDate: string, timezone: string = 'Australia/Sydney'): CountdownResult => {
  const [display, setDisplay] = useState<string>('');
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [parts, setParts] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const updateCountdown = useCallback(() => {
    const now = Date.now();
    
    if (now - lastUpdateRef.current >= 1000) {
      const countdownParts = getCountdownParts(targetDate, timezone);
      
      if (!countdownParts) {
        setIsExpired(true);
        setDisplay('Started');
        setParts(null);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        return;
      }

      setParts(countdownParts);
      setDisplay(formatCountdown(countdownParts));
      setIsExpired(false);
      lastUpdateRef.current = now;
    }

    rafRef.current = requestAnimationFrame(updateCountdown);
  }, [targetDate, timezone]);

  useEffect(() => {
    updateCountdown();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateCountdown]);

  return { display, isExpired, parts };
};
