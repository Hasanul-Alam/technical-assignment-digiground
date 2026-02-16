import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SportWithTournaments } from '../../types/tournament';
import { SPORT_COLORS } from '../../utils/constants';
import { triggerLightHaptic } from '../../utils/haptics';

interface SportSectionProps {
  sport: SportWithTournaments;
  selectedIds: number[];
  onToggleTournament: (id: number) => void;
  expanded?: boolean;
}

const SportSection: React.FC<SportSectionProps> = memo(({
  sport,
  selectedIds,
  onToggleTournament,
  expanded = true,
}) => {
  const sportColor = SPORT_COLORS[sport.id] || '#666';

  return (
    <View className="mb-4">
      {/* Sport Header */}
      <View className="flex-row items-center px-4 py-2 bg-gray-50">
        <View
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: sportColor }}
        />
        <Text className="text-sm font-bold text-gray-800 flex-1">
          {sport.sportName}
        </Text>
        <Text className="text-xs text-gray-500">
          {sport.tournaments.length} tournaments
        </Text>
      </View>

      {/* Tournaments List */}
      {expanded && (
        <View className="bg-white">
          {sport.tournaments.map((tournament) => {
            const isSelected = selectedIds.includes(tournament.id);
            return (
              <Pressable
                key={tournament.id}
                onPress={() => {
                  triggerLightHaptic();
                  onToggleTournament(tournament.id);
                }}
                className="flex-row items-center px-4 py-3 border-b border-gray-100 active:bg-gray-50"
              >
                <View
                  className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                    isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text
                  className={`text-sm flex-1 ${
                    isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'
                  }`}
                  numberOfLines={1}
                >
                  {tournament.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
});

SportSection.displayName = 'SportSection';

export default SportSection;
