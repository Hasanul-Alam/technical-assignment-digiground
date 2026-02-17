import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "../../theme/colors";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
  color = colors.primary.main,
  message,
}) => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="text-text-secondary text-base mt-4 text-center">
          {message}
        </Text>
      )}
    </View>
  );
};
