import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useCountdown } from '../../hooks/useCountdown';
import { COLORS } from '../../utils/constants';
import { isMatchLive } from '../../utils/dateUtils';

interface CountdownTimerProps {
  targetDate: string;
  timezone: string;
  matchStatus: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = memo(({ targetDate, timezone, matchStatus }) => {
  const { display, isExpired } = useCountdown(targetDate, timezone);

  if (isMatchLive(matchStatus)) {
    return (
      <View className="flex-row items-center">
        <View className="w-2 h-2 rounded-full bg-red-500 mr-1 animate-pulse" />
        <Text className="text-red-500 font-bold text-xs">LIVE</Text>
      </View>
    );
  }

  if (isExpired) {
    return (
      <Text className="text-gray-500 text-xs font-medium">Started</Text>
    );
  }

  return (
    <View className="bg-gray-100 px-2 py-1 rounded">
      <Text className="text-gray-700 text-xs font-semibold" style={{ color: COLORS.primary }}>
        {display || '--'}
      </Text>
    </View>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer;
