import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Match } from '../../types/match';
import { COLORS, MEDIA_BASE_URL } from '../../utils/constants';
import { formatMatchDate, formatMatchTime, isMatchLive } from '../../utils/dateUtils';
import { getStatusColor, getStatusLabel, getTeamInitials } from '../../utils/formatters';
import CountdownTimer from './CountdownTimer';

interface MatchCardProps {
  match: Match;
  onPress?: (match: Match) => void;
}

const MatchCard: React.FC<MatchCardProps> = memo(({ match, onPress }) => {
  const handlePress = () => {
    onPress?.(match);
  };

  const homeTeamLogo = match.homeTeam.logo ? `${MEDIA_BASE_URL}${match.homeTeam.logo}` : null;
  const awayTeamLogo = match.awayTeam.logo ? `${MEDIA_BASE_URL}${match.awayTeam.logo}` : null;

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white mx-4 my-2 p-4 rounded-xl shadow-sm border border-gray-100"
      style={{ elevation: 2 }}
    >
      {/* Header: Tournament & Status */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1 mr-2">
          <Text className="text-xs text-gray-500 font-medium" numberOfLines={1}>
            {match.tournament?.name || 'Unknown Tournament'}
          </Text>
        </View>
        <View
          className="px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${getStatusColor(match.matchStatus)}20` }}
        >
          <Text
            className="text-xs font-bold"
            style={{ color: getStatusColor(match.matchStatus) }}
          >
            {getStatusLabel(match.matchStatus)}
          </Text>
        </View>
      </View>

      {/* Teams Row */}
      <View className="flex-row items-center justify-between">
        {/* Home Team */}
        <View className="flex-1 items-center">
          {homeTeamLogo ? (
            <Image
              source={{ uri: homeTeamLogo }}
              style={{ width: 48, height: 48 }}
              contentFit="contain"
              transition={200}
              placeholder="L5H2?="
            />
          ) : (
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.secondary }}
            >
              <Text className="text-lg font-bold text-gray-600">
                {getTeamInitials(match.homeTeam.name)}
              </Text>
            </View>
          )}
          <Text className="text-sm font-semibold text-gray-800 mt-2 text-center" numberOfLines={2}>
            {match.homeTeam.name}
          </Text>
          {match.homeTeam.score && (
            <Text className="text-lg font-bold text-gray-900 mt-1">
              {match.homeTeam.score}
            </Text>
          )}
        </View>

        {/* VS / Countdown */}
        <View className="px-4 items-center">
          {isMatchLive(match.matchStatus) ? (
            <Text className="text-xl font-bold text-red-500">VS</Text>
          ) : (
            <CountdownTimer
              targetDate={match.startTime}
              timezone={match.timezone}
              matchStatus={match.matchStatus}
            />
          )}
        </View>

        {/* Away Team */}
        <View className="flex-1 items-center">
          {awayTeamLogo ? (
            <Image
              source={{ uri: awayTeamLogo }}
              style={{ width: 48, height: 48 }}
              contentFit="contain"
              transition={200}
              placeholder="L5H2?="
            />
          ) : (
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.secondary }}
            >
              <Text className="text-lg font-bold text-gray-600">
                {getTeamInitials(match.awayTeam.name)}
              </Text>
            </View>
          )}
          <Text className="text-sm font-semibold text-gray-800 mt-2 text-center" numberOfLines={2}>
            {match.awayTeam.name}
          </Text>
          {match.awayTeam.score && (
            <Text className="text-lg font-bold text-gray-900 mt-1">
              {match.awayTeam.score}
            </Text>
          )}
        </View>
      </View>

      {/* Footer: Date & Time */}
      <View className="flex-row justify-center items-center mt-3 pt-3 border-t border-gray-100">
        <Text className="text-xs text-gray-500">
          {formatMatchDate(match.startTime, match.timezone)}
        </Text>
        <Text className="text-xs text-gray-400 mx-2">•</Text>
        <Text className="text-xs text-gray-500">
          {formatMatchTime(match.startTime, match.timezone)}
        </Text>
      </View>
    </Pressable>
  );
});

MatchCard.displayName = 'MatchCard';

export default MatchCard;
