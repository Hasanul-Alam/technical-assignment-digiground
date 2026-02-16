import { useQuery } from '@tanstack/react-query';
import { fetchTournaments } from '../services/tournamentApi';
import { AllSportsAndLeaguesParams } from '../types/tournament';

interface UseTournamentsOptions {
  search?: string;
  limit?: number;
  enabled?: boolean;
}

export const useTournaments = (options: UseTournamentsOptions = {}) => {
  const { search, limit = 50, enabled = true } = options;

  const query = useQuery({
    queryKey: ['tournaments', { search, limit }],
    queryFn: async () => {
      const params: AllSportsAndLeaguesParams = {
        ...(search && { search }),
        limit,
        offset: 0,
      };

      return fetchTournaments(params);
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    enabled,
  });

  const sports = query.data?.sports ?? [];
  const allTournaments = sports.flatMap((sport) =>
    sport.tournaments.map((t) => ({
      ...t,
      sportId: sport.id,
      sportName: sport.sportName,
    }))
  );

  return {
    ...query,
    sports,
    allTournaments,
  };
};
