import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useFilter } from '../../context/FilterContext';
import { useTournaments } from '../../hooks/useTournaments';
import { SportWithTournaments } from '../../types/tournament';
import { COLORS } from '../../utils/constants';
import SportSection from './SportSection';

interface FilterSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  onClose: () => void;
}

const FilterSheet: React.FC<FilterSheetProps> = ({ bottomSheetRef, onClose }) => {
  const { sports, isLoading, isError, refetch } = useTournaments({ limit: 100 });
  const {
    pendingTournamentIds,
    toggleTournament,
    clearFilters,
    applyFilters,
    selectedTournamentIds,
  } = useFilter();

  const snapPoints = useMemo(() => ['50%', '85%'], []);

  const handleApply = useCallback(() => {
    applyFilters();
    onClose();
  }, [applyFilters, onClose]);

  const handleClear = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleToggleTournament = useCallback((id: number) => {
    toggleTournament(id);
  }, [toggleTournament]);

  const renderSportSection = useCallback(({ item }: { item: SportWithTournaments }) => {
    return (
      <SportSection
        sport={item}
        selectedIds={pendingTournamentIds}
        onToggleTournament={handleToggleTournament}
        expanded={true}
      />
    );
  }, [pendingTournamentIds, handleToggleTournament]);

  const selectedCount = pendingTournamentIds.length;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      backgroundStyle={{ backgroundColor: 'white' }}
      handleIndicatorStyle={{ backgroundColor: '#ccc', width: 40 }}
    >
      <BottomSheetView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-900">Filter by Tournament</Text>
          <Pressable onPress={onClose} className="p-2">
            <Ionicons name="close" size={24} color="#666" />
          </Pressable>
        </View>

        {/* Content */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text className="text-gray-500 mt-4">Loading tournaments...</Text>
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center px-8">
            <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
            <Text className="text-gray-600 text-center mt-4 mb-6">
              Failed to load tournaments
            </Text>
            <Pressable
              onPress={() => refetch()}
              className="px-6 py-3 rounded-lg"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-white font-semibold">Retry</Text>
            </Pressable>
          </View>
        ) : (
          <BottomSheetFlatList
            data={sports}
            renderItem={renderSportSection}
            keyExtractor={(item: SportWithTournaments) => `sport-${item.id}`}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Footer */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 flex-row">
          <Pressable
            onPress={handleClear}
            className="flex-1 mr-3 py-3 rounded-lg border border-gray-300 items-center"
            disabled={selectedCount === 0}
            style={{ opacity: selectedCount === 0 ? 0.5 : 1 }}
          >
            <Text className="text-gray-700 font-semibold">Reset</Text>
          </Pressable>
          <Pressable
            onPress={handleApply}
            className="flex-1 ml-3 py-3 rounded-lg items-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="text-white font-semibold">
              Apply {selectedCount > 0 ? `(${selectedCount})` : ''}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterSheet;
