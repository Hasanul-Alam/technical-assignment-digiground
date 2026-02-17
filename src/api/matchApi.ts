import { MatchListParams } from "@/types/api.types";
import { Match, MatchListResponse } from "@/types/match.types";
import axiosInstance from "./axiosInstance";

/**
 * Fetch match list with pagination
 */
export const fetchMatches = async (
  params: MatchListParams,
): Promise<MatchListResponse> => {
  try {
    const response = await axiosInstance.get<{ data: Match[] }>("/matchList", {
      params: {
        timezone: params.timezone,
        status: params.status || "all",
        limit: params.limit || 20,
        offset: params.offset || 0,
        ...(params.todate && { todate: params.todate }),
        ...(params.tournament_ids && { tournament_ids: params.tournament_ids }),
      },
    });
    console.log("API response", JSON.stringify(response.data.data, null, 2));

    const matches = response.data || [];
    console.log("matches", matches);
    const hasMore = matches.length === (params.limit || 20);

    return {
      matches,
      total: matches.length,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

/**
 * Fetch single match details
 */
export const fetchMatchDetails = async (matchId: number): Promise<Match> => {
  try {
    const response = await axiosInstance.get<{ data: Match }>(
      `/match/${matchId}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    throw error;
  }
};

/**
 * Transform API response to Match type
 */
export const transformMatchData = (apiData: any): Match => {
  return {
    id: apiData.id,
    sportId: apiData.sport_id || apiData.sportId,
    sportName: apiData.sport_name || apiData.sportName,
    tournamentId: apiData.tournament_id || apiData.tournamentId,
    tournamentName: apiData.tournament_name || apiData.tournamentName,
    homeTeam: {
      id: apiData.home_team?.id || apiData.homeTeam?.id,
      name: apiData.home_team?.name || apiData.homeTeam?.name,
      shortName: apiData.home_team?.short_name || apiData.homeTeam?.shortName,
      logo: apiData.home_team?.logo || apiData.homeTeam?.logo,
      score: apiData.home_team?.score || apiData.homeTeam?.score,
    },
    awayTeam: {
      id: apiData.away_team?.id || apiData.awayTeam?.id,
      name: apiData.away_team?.name || apiData.awayTeam?.name,
      shortName: apiData.away_team?.short_name || apiData.awayTeam?.shortName,
      logo: apiData.away_team?.logo || apiData.awayTeam?.logo,
      score: apiData.away_team?.score || apiData.awayTeam?.score,
    },
    matchTime: apiData.match_time || apiData.matchTime,
    status: apiData.status,
    venue: apiData.venue,
    round: apiData.round,
  };
};
