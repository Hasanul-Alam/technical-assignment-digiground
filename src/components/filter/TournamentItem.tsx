import { Tournament } from "@/types/tournament.types";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TournamentItemProps {
  tournament: Tournament;
  isSelected: boolean;
  onToggle: (tournamentId: number) => void;
}

const TournamentItemComponent: React.FC<TournamentItemProps> = ({
  tournament,
  isSelected,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onToggle(tournament.id)}
      className="flex-row items-center py-3 px-4 active:bg-background-tertiary"
      activeOpacity={0.7}
    >
      <View
        className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
          isSelected
            ? "bg-primary border-primary"
            : "bg-white border-border-dark"
        }`}
      >
        {isSelected && <Text className="text-white text-xs font-bold">✓</Text>}
      </View>
      <Text className="flex-1 text-text-primary text-base">
        {tournament.name}
      </Text>
    </TouchableOpacity>
  );
};

export const TournamentItem = memo(
  TournamentItemComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.tournament.id === nextProps.tournament.id &&
      prevProps.isSelected === nextProps.isSelected
    );
  },
);
