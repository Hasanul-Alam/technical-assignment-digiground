import { fetchMatches } from "@/api/matchApi";
import { Match } from "@/types/match.types";
import { DEFAULT_PAGE_SIZE, DEFAULT_TIMEZONE } from "@/utils/constants";
import { removeDuplicates } from "@/utils/formatters";
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

interface UseMatchesParams {
  timezone?: string;
  status?: string;
  tournamentIds?: number[];
  enabled?: boolean;
}

interface UseMatchesResult {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasMore: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  refetch: () => void;
}

/**
 * Hook for fetching matches with infinite scroll
 */
export const useMatches = ({
  timezone = DEFAULT_TIMEZONE,
  status = "all",
  tournamentIds = [],
  enabled = true,
}: UseMatchesParams): UseMatchesResult => {
  const tournamentIdsString =
    tournamentIds.length > 0 ? tournamentIds.join(",") : undefined;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["matches", timezone, status, tournamentIdsString],
    queryFn: ({ pageParam = 0 }) =>
      fetchMatches({
        timezone,
        status,
        tournament_ids: tournamentIdsString,
        limit: DEFAULT_PAGE_SIZE,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length * DEFAULT_PAGE_SIZE;
    },
    initialPageParam: 0,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Flatten and deduplicate matches from all pages
  const allMatches = data?.pages.flatMap((page) => page.matches) || [];
  const uniqueMatches = removeDuplicates(allMatches);

  return {
    matches: uniqueMatches,
    isLoading,
    isError,
    error: error as Error | null,
    hasMore: hasNextPage || false,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
};

/**
 * Hook for fetching single match
 */
export const useMatch = (matchId: number): UseQueryResult<Match, Error> => {
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: async () => {
      const response = await fetchMatches({
        timezone: DEFAULT_TIMEZONE,
        limit: 1,
        offset: 0,
      });
      const match = response.matches.find((m) => m.id === matchId);
      if (!match) throw new Error("Match not found");
      return match;
    },
    enabled: !!matchId,
  });
};
