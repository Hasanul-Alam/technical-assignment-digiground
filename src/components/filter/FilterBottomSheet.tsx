import { useTournaments } from "@/hooks/useTournaments";
import { colors } from "@/theme/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SportSection } from "./SportSection";

export interface FilterBottomSheetRef {
  open: () => void;
  close: () => void;
}

interface FilterBottomSheetProps {
  selectedTournamentIds: number[];
  onApply: (tournamentIds: number[]) => void;
  onReset: () => void;
}

export const FilterBottomSheet = forwardRef<
  FilterBottomSheetRef,
  FilterBottomSheetProps
>(({ selectedTournamentIds, onApply, onReset }, ref) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [localSelectedIds, setLocalSelectedIds] = React.useState<number[]>(
    selectedTournamentIds,
  );

  const { sports, isLoading, isError, refetch } = useTournaments(true);

  const snapPoints = useMemo(() => ["75%", "90%"], []);

  useImperativeHandle(ref, () => ({
    open: () => {
      setLocalSelectedIds(selectedTournamentIds);
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
  }));

  const handleToggleTournament = useCallback((tournamentId: number) => {
    setLocalSelectedIds((prev) => {
      if (prev.includes(tournamentId)) {
        return prev.filter((id) => id !== tournamentId);
      }
      return [...prev, tournamentId];
    });
  }, []);

  const handleApply = useCallback(() => {
    onApply(localSelectedIds);
    bottomSheetRef.current?.close();
  }, [localSelectedIds, onApply]);

  const handleReset = useCallback(() => {
    setLocalSelectedIds([]);
    onReset();
    bottomSheetRef.current?.close();
  }, [onReset]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.background.primary }}
      handleIndicatorStyle={{ backgroundColor: colors.border.dark }}
    >
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pb-3 border-b border-border-light">
          <View className="flex-row items-center justify-between">
            <Text className="text-text-primary text-xl font-bold">Filters</Text>
            <TouchableOpacity
              onPress={handleReset}
              className="px-3 py-1 active:opacity-70"
            >
              <Text className="text-primary text-sm font-semibold">
                Reset All
              </Text>
            </TouchableOpacity>
          </View>
          {localSelectedIds.length > 0 && (
            <Text className="text-text-secondary text-sm mt-1">
              {localSelectedIds.length} tournament
              {localSelectedIds.length !== 1 ? "s" : ""} selected
            </Text>
          )}
        </View>

        {/* Content */}
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {isLoading && (
            <View className="py-8 items-center">
              <ActivityIndicator size="large" color={colors.primary.main} />
              <Text className="text-text-secondary text-sm mt-2">
                Loading tournaments...
              </Text>
            </View>
          )}

          {isError && (
            <View className="py-8 items-center px-4">
              <Text className="text-error text-base font-semibold mb-2">
                Failed to Load Tournaments
              </Text>
              <TouchableOpacity
                onPress={() => refetch()}
                className="bg-primary px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLoading && !isError && sports.length === 0 && (
            <View className="py-8 items-center">
              <Text className="text-text-secondary text-base">
                No tournaments available
              </Text>
            </View>
          )}

          {!isLoading && !isError && sports.length > 0 && (
            <View className="pt-2">
              {sports.map((sport) => (
                <SportSection
                  key={sport.id}
                  sport={sport}
                  selectedTournamentIds={localSelectedIds}
                  onToggleTournament={handleToggleTournament}
                />
              ))}
            </View>
          )}
        </BottomSheetScrollView>

        {/* Footer */}
        <View className="px-4 py-3 bg-white border-t border-border-light">
          <TouchableOpacity
            onPress={handleApply}
            className="bg-primary py-4 rounded-xl active:opacity-80"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-bold text-base">
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
});

FilterBottomSheet.displayName = "FilterBottomSheet";
