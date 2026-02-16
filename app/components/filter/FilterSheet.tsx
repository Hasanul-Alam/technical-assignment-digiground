import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const { sports, isLoading, isError, refetch } = useTournaments({ limit: 100 });
  const {
    pendingTournamentIds,
    toggleTournament,
    clearFilters,
    applyFilters,
  } = useFilter();

  const snapPoints = useMemo(() => [350, 550], []);

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
      backgroundStyle={{ backgroundColor: '#F8FAFC' }}
      handleIndicatorStyle={{ backgroundColor: '#CBD5E1', width: 36 }}
      bottomInset={insets.bottom + 80}
    >
      <View className="flex-1" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-900">Filter by Tournament</Text>
          <Pressable onPress={onClose} className="p-2 -mr-2 rounded-full" hitSlop={12}>
            <Ionicons name="close" size={22} color="#64748B" />
          </Pressable>
        </View>

        {/* Content */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text className="text-gray-500 mt-4 text-base">Loading tournaments...</Text>
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center px-8 py-12">
            <View className="w-16 h-16 rounded-full bg-red-50 items-center justify-center mb-4">
              <Ionicons name="alert-circle-outline" size={36} color={COLORS.error} />
            </View>
            <Text className="text-gray-700 text-center text-base font-medium mb-2">
              Failed to load tournaments
            </Text>
            <Text className="text-gray-400 text-center text-sm mb-6">
              Please check your connection and try again
            </Text>
            <Pressable
              onPress={() => refetch()}
              className="px-6 py-3 rounded-xl flex-row items-center"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Ionicons name="refresh" size={18} color="white" style={{ marginRight: 8 }} />
              <Text className="text-white font-semibold">Try Again</Text>
            </Pressable>
          </View>
        ) : (
          <BottomSheetFlatList
            data={sports}
            renderItem={renderSportSection}
            keyExtractor={(item: SportWithTournaments) => `sport-${item.id}`}
            contentContainerStyle={{ paddingBottom: 8, paddingTop: 8 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text className="px-5 py-2 text-xs text-gray-400 font-medium">
                {sports.length} sports • {sports.reduce((acc, s) => acc + s.tournaments.length, 0)} tournaments
              </Text>
            }
          />
        )}
      </View>

      {/* Footer - Fixed at bottom */}
      <View 
        className="bg-white px-5 py-4 flex-row items-center border-t border-gray-100" 
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Pressable
          onPress={handleClear}
          className="flex-1 mr-3 py-3.5 rounded-xl border border-gray-200 items-center"
          disabled={selectedCount === 0}
          style={{ opacity: selectedCount === 0 ? 0.5 : 1, backgroundColor: '#F8FAFC' }}
        >
          <Text className="text-gray-600 font-semibold">Reset</Text>
        </Pressable>
        <Pressable
          onPress={handleApply}
          className="flex-1 ml-3 py-3.5 rounded-xl items-center"
          style={{ 
            backgroundColor: selectedCount > 0 ? COLORS.primary : '#94A3B8',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          disabled={selectedCount === 0}
        >
          <Text className="text-white font-semibold text-base">
            Apply {selectedCount > 0 ? `(${selectedCount})` : ''}
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default FilterSheet;
