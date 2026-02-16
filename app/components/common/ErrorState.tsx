import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../utils/constants';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We couldn\'t load the matches. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${COLORS.error}15` }}
      >
        <Ionicons name="alert-circle-outline" size={32} color={COLORS.error} />
      </View>
      
      <Text className="text-lg font-semibold text-gray-800 text-center mb-2">
        {title}
      </Text>
      
      <Text className="text-sm text-gray-500 text-center mb-6">
        {message}
      </Text>

      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="flex-row items-center px-6 py-3 rounded-lg"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Ionicons name="refresh" size={18} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-semibold">Try Again</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ErrorState;
