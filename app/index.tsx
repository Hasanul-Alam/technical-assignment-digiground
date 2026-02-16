import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import FilterSheet from './components/filter/FilterSheet';
import MatchList from './components/match/MatchList';
import { useFilter } from './context/FilterContext';
import { useMatches } from './hooks/useMatches';
import { COLORS } from './utils/constants';

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedTournamentIds, clearFilters, isFilterActive } = useFilter();

  const {
    matches,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useMatches({
    tournamentIds: selectedTournamentIds,
  });

  const handleOpenFilter = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleCloseFilter = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClearFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Matches</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {isLoading && matches.length === 0
                ? 'Loading...'
                : `${matches.length} matches found`}
            </Text>
          </View>
          <Pressable
            onPress={handleOpenFilter}
            className="flex-row items-center px-4 py-2 rounded-lg"
            style={{
              backgroundColor: isFilterActive ? `${COLORS.primary}15` : '#f3f4f6',
            }}
          >
            <Ionicons
              name="filter"
              size={18}
              color={isFilterActive ? COLORS.primary : '#666'}
            />
            <Text
              className="ml-2 font-semibold"
              style={{ color: isFilterActive ? COLORS.primary : '#666' }}
            >
              Filter
            </Text>
            {isFilterActive && (
              <View
                className="ml-2 w-5 h-5 rounded-full items-center justify-center"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Text className="text-white text-xs font-bold">
                  {selectedTournamentIds.length}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Match List */}
      <MatchList
        matches={matches}
        isLoading={isLoading}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onRefresh={refetch}
        onLoadMore={handleLoadMore}
        onClearFilters={handleClearFilters}
        isFiltered={isFilterActive}
      />

      {/* Filter Bottom Sheet */}
      <FilterSheet bottomSheetRef={bottomSheetRef} onClose={handleCloseFilter} />
    </View>
  );
}
