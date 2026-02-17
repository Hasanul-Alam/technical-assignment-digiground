import React, { useCallback, useRef, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FilterBottomSheet,
  FilterBottomSheetRef,
} from "../components/filter/FilterBottomSheet";
import { MatchList } from "../components/match/MatchList";
import { useMatches } from "../hooks/useMatches";
import { Match } from "../types/match.types";
import { DEFAULT_TIMEZONE } from "../utils/constants";

export default function MatchListScreen() {
  const [selectedTournamentIds, setSelectedTournamentIds] = useState<number[]>(
    [],
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const filterBottomSheetRef = useRef<FilterBottomSheetRef>(null);

  const {
    matches,
    isLoading,
    isError,
    error,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useMatches({
    timezone: DEFAULT_TIMEZONE,
    status: "all",
    tournamentIds: selectedTournamentIds,
    enabled: true,
  });

  console.log("Matches in screen", JSON.stringify(matches.status, null, 2));

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasMore, isFetchingNextPage, isLoading, fetchNextPage]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handleOpenFilters = useCallback(() => {
    filterBottomSheetRef.current?.open();
  }, []);

  const handleApplyFilters = useCallback((tournamentIds: number[]) => {
    setSelectedTournamentIds(tournamentIds);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedTournamentIds([]);
  }, []);

  const handleMatchPress = useCallback((match: Match) => {
    console.log("Match pressed:", match.id);
    // Handle navigation or show match details
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-secondary" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-border-light">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-text-primary text-2xl font-bold">
              Matches
            </Text>
            {selectedTournamentIds.length > 0 && (
              <Text className="text-text-secondary text-sm mt-1">
                {selectedTournamentIds.length} filter
                {selectedTournamentIds.length !== 1 ? "s" : ""} active
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleOpenFilters}
            className="flex-row items-center bg-background-tertiary px-4 py-2 rounded-xl active:bg-background-secondary"
            activeOpacity={0.7}
          >
            <Text className="text-base mr-2">🔍</Text>
            <Text className="text-text-primary font-semibold text-base">
              Filters
            </Text>
            {selectedTournamentIds.length > 0 && (
              <View className="ml-2 bg-primary w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {selectedTournamentIds.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Match List */}
      <MatchList
        matches={matches}
        isLoading={isLoading}
        isError={isError}
        error={error}
        hasMore={hasMore}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onMatchPress={handleMatchPress}
      />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        ref={filterBottomSheetRef}
        selectedTournamentIds={selectedTournamentIds}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </SafeAreaView>
  );
}
