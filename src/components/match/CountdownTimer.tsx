import { hasMatchStarted } from "@/utils/dateUtils";
import React, { memo } from "react";
import { Text, View } from "react-native";
import { useCountdown } from "../../hooks/useCountdown";

interface CountdownTimerProps {
  matchTime: string;
  status?: string;
}

const CountdownTimerComponent: React.FC<CountdownTimerProps> = ({
  matchTime,
  status,
}) => {
  const { formattedTime, isExpired } = useCountdown(matchTime);
  const matchStarted = hasMatchStarted(matchTime);

  if (matchStarted || isExpired) {
    return (
      <View className="bg-success/10 px-3 py-1 rounded-full">
        <Text className="text-success text-xs font-semibold">
          {status === "live" ? "LIVE" : "Started"}
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-primary/10 px-3 py-1 rounded-full">
      <Text className="text-primary text-xs font-semibold">
        {formattedTime}
      </Text>
    </View>
  );
};

// Memoize to prevent unnecessary re-renders
export const CountdownTimer = memo(
  CountdownTimerComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.matchTime === nextProps.matchTime &&
      prevProps.status === nextProps.status
    );
  },
);
