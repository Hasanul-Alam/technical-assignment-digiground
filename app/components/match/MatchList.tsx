import React, { useCallback } from 'react';
import {
    FlatList,
    ListRenderItem,
    RefreshControl
} from 'react-native';
import { Match } from '../../types/match';
import { COLORS } from '../../utils/constants';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import LoadingSpinner from '../common/LoadingSpinner';
import MatchCard from './MatchCard';
import { MatchSkeletonList } from './MatchSkeleton';

interface MatchListProps {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onClearFilters?: () => void;
  isFiltered?: boolean;
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  onRefresh,
  onLoadMore,
  onClearFilters,
  isFiltered = false,
}) => {
  const renderItem: ListRenderItem<Match> = useCallback(({ item }) => {
    return <MatchCard match={item} />;
  }, []);

  const keyExtractor = useCallback((item: Match) => {
    return `match-${item.id}-${item.matchId}`;
  }, []);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <LoadingSpinner />;
  };

  const renderEmpty = () => {
    if (isLoading) {
      return <MatchSkeletonList count={5} />;
    }

    if (isError) {
      return (
        <ErrorState
          onRetry={onRefresh}
        />
      );
    }

    if (matches.length === 0) {
      return (
        <EmptyState
          title={isFiltered ? 'No matches found' : 'No upcoming matches'}
          message={
            isFiltered
              ? 'Try adjusting your filters to see more matches.'
              : 'There are no matches scheduled at the moment.'
          }
          icon={isFiltered ? 'filter-outline' : 'calendar-outline'}
          actionLabel={isFiltered ? 'Clear Filters' : undefined}
          onAction={isFiltered ? onClearFilters : undefined}
        />
      );
    }

    return null;
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={matches}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={8}
    />
  );
};

export default MatchList;
