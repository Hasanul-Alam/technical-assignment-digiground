import { Match } from "@/types/match.types";
import { MEDIA_BASE_URL } from "@/utils/constants";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { formatTeamName, getImageUrl } from "@/utils/formatters";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CountdownTimer } from "./CountdownTimer";

interface MatchCardProps {
  match: Match;
  onPress?: (match: Match) => void;
}

const MatchCardComponent: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const handlePress = () => {
    onPress?.(match);
  };

  console.log("Match Card Props:", JSON.stringify(match.sportName, null, 2));

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm border border-border-light"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1">
          <Text
            className="text-text-primary font-semibold text-sm"
            numberOfLines={1}
          >
            {match.tournamentName}
          </Text>
          <Text className="text-text-tertiary text-xs mt-0.5">
            {match.sportName}
          </Text>
        </View>
        <CountdownTimer matchTime={match.matchTime} status={match.status} />
      </View>

      {/* Match Details */}
      <View className="flex-row items-center justify-between">
        {/* Home Team */}
        <View className="flex-1 items-center">
          <View className="w-14 h-14 rounded-full bg-background-tertiary justify-center items-center mb-2 overflow-hidden">
            {match.homeTeam.logo ? (
              <Image
                source={{
                  uri: getImageUrl(match.homeTeam.logo, MEDIA_BASE_URL),
                }}
                className="w-12 h-12"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-text-tertiary text-xl font-bold">
                {match.homeTeam.shortName?.substring(0, 2).toUpperCase() || "?"}
              </Text>
            )}
          </View>
          <Text
            className="text-text-primary font-semibold text-sm text-center"
            numberOfLines={2}
          >
            {formatTeamName(match.homeTeam.name, 15)}
          </Text>
          {match.homeTeam.score !== undefined && (
            <Text className="text-text-secondary text-xs mt-1">
              {match.homeTeam.score}
            </Text>
          )}
        </View>

        {/* VS / Time */}
        <View className="items-center px-4">
          <Text className="text-text-tertiary text-xs font-semibold">VS</Text>
          <Text className="text-text-secondary text-xs mt-1">
            {formatTime(match.matchTime)}
          </Text>
          <Text className="text-text-tertiary text-xs">
            {formatDate(match.matchTime, "MMM dd")}
          </Text>
        </View>

        {/* Away Team */}
        <View className="flex-1 items-center">
          <View className="w-14 h-14 rounded-full bg-background-tertiary justify-center items-center mb-2 overflow-hidden">
            {match.awayTeam.logo ? (
              <Image
                source={{
                  uri: getImageUrl(match.awayTeam.logo, MEDIA_BASE_URL),
                }}
                className="w-12 h-12"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-text-tertiary text-xl font-bold">
                {match.awayTeam.shortName?.substring(0, 2).toUpperCase() || "?"}
              </Text>
            )}
          </View>
          <Text
            className="text-text-primary font-semibold text-sm text-center"
            numberOfLines={2}
          >
            {formatTeamName(match.awayTeam.name, 15)}
          </Text>
          {match.awayTeam.score !== undefined && (
            <Text className="text-text-secondary text-xs mt-1">
              {match.awayTeam.score}
            </Text>
          )}
        </View>
      </View>

      {/* Venue */}
      {match.venue && (
        <View className="mt-3 pt-3 border-t border-border-light">
          <Text className="text-text-tertiary text-xs text-center">
            📍 {match.venue}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Memoize to prevent unnecessary re-renders
export const MatchCard = memo(MatchCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.match.id === nextProps.match.id &&
    prevProps.match.status === nextProps.match.status &&
    prevProps.match.homeTeam.score === nextProps.match.homeTeam.score &&
    prevProps.match.awayTeam.score === nextProps.match.awayTeam.score
  );
});
