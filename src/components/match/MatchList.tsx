import { colors } from "@/theme/colors";
import { Match } from "@/types/match.types";
import { FlashList } from "@shopify/flash-list";
import React, { memo, useCallback } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";

import { EmptyState } from "../common/EmptyState";
import { ErrorState } from "../common/ErroState";
import { MatchListSkeleton } from "../common/SkeletonLoader";
import { MatchCard } from "./MatchCard";

interface MatchListProps {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasMore: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  onMatchPress?: (match: Match) => void;
}

const MatchListComponent: React.FC<MatchListProps> = ({
  matches,
  isLoading,
  isError,
  error,
  hasMore,
  isFetchingNextPage,
  onLoadMore,
  onRefresh,
  isRefreshing = false,
  onMatchPress,
}) => {
  // Render item
  const renderItem = useCallback(
    ({ item }: { item: Match }) => {
      console.log("Rendering match item:", JSON.stringify(item, null, 2));
      return <MatchCard match={item} onPress={onMatchPress} />;
    },
    [onMatchPress],
  );

  // Key extractor
  const keyExtractor = useCallback((item: Match) => `match-${item.id}`, []);

  // Get item type for optimization
  const getItemType = useCallback((item: Match) => {
    return "match";
  }, []);

  // Handle end reached
  const handleEndReached = useCallback(() => {
    if (hasMore && !isFetchingNextPage && !isLoading) {
      onLoadMore();
    }
  }, [hasMore, isFetchingNextPage, isLoading, onLoadMore]);

  // Footer component
  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color={colors.primary.main} />
        <Text className="text-text-secondary text-xs mt-2">
          Loading more matches...
        </Text>
      </View>
    );
  }, [isFetchingNextPage]);

  // Empty component
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return <MatchListSkeleton />;
    }

    if (isError) {
      return (
        <ErrorState
          message={error?.message || "Failed to load matches"}
          onRetry={onRefresh}
        />
      );
    }

    return <EmptyState />;
  }, [isLoading, isError, error, onRefresh]);

  // Separator
  const ItemSeparator = useCallback(() => <View className="h-2" />, []);

  return (
    <FlashList
      data={matches.matches}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={getItemType}
      estimatedItemSize={200}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={ItemSeparator}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary.main}
          colors={[colors.primary.main]}
        />
      }
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
    />
  );
};

export const MatchList = memo(MatchListComponent);
