import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../utils/constants';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'small',
  color = COLORS.primary,
}) => {
  return (
    <View className="py-4 items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;
