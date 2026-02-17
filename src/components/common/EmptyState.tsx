import React from "react";
import { Text, View } from "react-native";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Matches Found",
  message = "There are no matches available at this time. Please check back later or adjust your filters.",
  icon,
}) => {
  return (
    <View className="flex-1 justify-center items-center p-6">
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-text-primary text-xl font-semibold text-center mb-2">
        {title}
      </Text>
      <Text className="text-text-secondary text-base text-center max-w-sm">
        {message}
      </Text>
    </View>
  );
};
