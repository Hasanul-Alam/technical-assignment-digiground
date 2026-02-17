import { Sport } from "@/types/tournament.types";
import React, { memo, useCallback, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { TournamentItem } from "./TournamentItem";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SportSectionProps {
  sport: Sport;
  selectedTournamentIds: number[];
  onToggleTournament: (tournamentId: number) => void;
}

const SportSectionComponent: React.FC<SportSectionProps> = ({
  sport,
  selectedTournamentIds,
  onToggleTournament,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  }, []);

  const selectedCount = sport.tournaments.filter((t) =>
    selectedTournamentIds.includes(t.id),
  ).length;

  return (
    <View className="mb-2">
      <TouchableOpacity
        onPress={toggleExpand}
        className="flex-row items-center justify-between bg-background-tertiary px-4 py-3 active:bg-background-secondary"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          <Text className="text-base mr-2">{isExpanded ? "▼" : "▶"}</Text>
          <Text className="text-text-primary font-semibold text-base flex-1">
            {sport.sportName}
          </Text>
        </View>
        {selectedCount > 0 && (
          <View className="bg-primary px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-semibold">
              {selectedCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {isExpanded && sport.tournaments.length > 0 && (
        <View className="bg-white">
          {sport.tournaments.map((tournament) => (
            <TournamentItem
              key={tournament.id}
              tournament={tournament}
              isSelected={selectedTournamentIds.includes(tournament.id)}
              onToggle={onToggleTournament}
            />
          ))}
        </View>
      )}

      {isExpanded && sport.tournaments.length === 0 && (
        <View className="bg-white py-4">
          <Text className="text-text-tertiary text-sm text-center">
            No tournaments available
          </Text>
        </View>
      )}
    </View>
  );
};

export const SportSection = memo(SportSectionComponent);
