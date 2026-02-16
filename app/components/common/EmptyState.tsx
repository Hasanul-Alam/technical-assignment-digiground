import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { COLORS } from '../../utils/constants';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No matches found',
  message = 'There are no matches available at the moment.',
  icon = 'calendar-outline',
  actionLabel,
  onAction,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${COLORS.primary}15` }}
      >
        <Ionicons name={icon} size={32} color={COLORS.primary} />
      </View>
      
      <Text className="text-lg font-semibold text-gray-800 text-center mb-2">
        {title}
      </Text>
      
      <Text className="text-sm text-gray-500 text-center mb-6">
        {message}
      </Text>

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="px-6 py-3 rounded-lg"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="text-white font-semibold">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmptyState;
