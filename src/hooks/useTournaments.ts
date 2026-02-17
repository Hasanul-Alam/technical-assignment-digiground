import {
  fetchSportsAndTournaments,
  fetchTournamentsBySports,
} from "@/api/tournamentApi";
import { Sport } from "@/types/tournament.types";
import { SPORTS } from "@/utils/constants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UseTournamentsResult extends UseQueryResult<Sport[], Error> {
  sports: Sport[];
}

/**
 * Hook for fetching sports and tournaments
 */
export const useTournaments = (
  enabled: boolean = true,
): UseTournamentsResult => {
  const supportedSportIds = Object.values(SPORTS);

  const query = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => fetchTournamentsBySports(supportedSportIds, 100),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    ...query,
    sports: query.data || [],
  };
};

/**
 * Hook for searching tournaments
 */
export const useSearchTournaments = (
  searchQuery: string,
  enabled: boolean = false,
) => {
  return useQuery({
    queryKey: ["tournaments", "search", searchQuery],
    queryFn: () =>
      fetchSportsAndTournaments({ search: searchQuery, limit: 50 }),
    enabled: enabled && searchQuery.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
