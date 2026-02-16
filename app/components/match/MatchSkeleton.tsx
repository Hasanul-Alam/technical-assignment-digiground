import React, { memo } from 'react';
import { View } from 'react-native';

const MatchSkeleton: React.FC = memo(() => {
  return (
    <View className="bg-white mx-4 my-2 p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Header Skeleton */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="w-32 h-3 bg-gray-200 rounded" />
        <View className="w-16 h-4 bg-gray-200 rounded-full" />
      </View>

      {/* Teams Row Skeleton */}
      <View className="flex-row items-center justify-between">
        {/* Home Team */}
        <View className="flex-1 items-center">
          <View className="w-12 h-12 rounded-full bg-gray-200" />
          <View className="w-20 h-3 bg-gray-200 rounded mt-2" />
        </View>

        {/* VS Skeleton */}
        <View className="px-4 items-center">
          <View className="w-12 h-4 bg-gray-200 rounded" />
        </View>

        {/* Away Team */}
        <View className="flex-1 items-center">
          <View className="w-12 h-12 rounded-full bg-gray-200" />
          <View className="w-20 h-3 bg-gray-200 rounded mt-2" />
        </View>
      </View>

      {/* Footer Skeleton */}
      <View className="flex-row justify-center items-center mt-3 pt-3 border-t border-gray-100">
        <View className="w-24 h-3 bg-gray-200 rounded" />
      </View>
    </View>
  );
});

MatchSkeleton.displayName = 'MatchSkeleton';

export default MatchSkeleton;

export const MatchSkeletonList: React.FC<{ count?: number }> = memo(({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <MatchSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
});

MatchSkeletonList.displayName = 'MatchSkeletonList';
