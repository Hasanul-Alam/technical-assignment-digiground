import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something Went Wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
  retryText = "Try Again",
}) => {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="w-16 h-16 rounded-full bg-error/10 justify-center items-center mb-4">
        <Text className="text-error text-3xl">⚠️</Text>
      </View>

      <Text className="text-text-primary text-xl font-semibold text-center mb-2">
        {title}
      </Text>

      <Text className="text-text-secondary text-base text-center max-w-sm mb-6">
        {message}
      </Text>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-primary px-6 py-3 rounded-lg active:opacity-80"
        >
          <Text className="text-white font-semibold text-base">
            {retryText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
