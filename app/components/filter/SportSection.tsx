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
  const selectedCount = sport.tournaments.filter(t => selectedIds.includes(t.id)).length;

  return (
    <View className="mb-2">
      {/* Sport Header */}
      <View className="flex-row items-center px-5 py-3 bg-gray-50">
        <View
          className="w-2.5 h-2.5 rounded-full mr-2.5"
          style={{ backgroundColor: sportColor }}
        />
        <Text className="text-sm font-bold text-gray-800 flex-1">
          {sport.sportName}
        </Text>
        {selectedCount > 0 && (
          <View className="px-2 py-0.5 rounded-full" style={{ backgroundColor: sportColor }}>
            <Text className="text-xs text-white font-medium">
              {selectedCount}
            </Text>
          </View>
        )}
      </View>

      {/* Tournaments List */}
      {expanded && (
        <View className="bg-white">
          {sport.tournaments.map((tournament, index) => {
            const isSelected = selectedIds.includes(tournament.id);
            return (
              <Pressable
                key={tournament.id}
                onPress={() => {
                  triggerLightHaptic();
                  onToggleTournament(tournament.id);
                }}
                className="flex-row items-center px-5 py-3.5 border-b border-gray-50 active:bg-gray-50"
              >
                <View
                  className={`w-5 h-5 rounded-md border-2 mr-3.5 items-center justify-center ${
                    isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text
                  className={`text-base flex-1 ${
                    isSelected ? 'font-semibold text-gray-900' : 'text-gray-600'
                  }`}
                  numberOfLines={1}
                >
                  {tournament.name}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={20} color={sportColor} />
                )}
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
