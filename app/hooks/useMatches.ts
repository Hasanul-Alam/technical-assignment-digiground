import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMatches } from '../services/matchApi';
import { Match, MatchListParams } from '../types/match';
import { DEFAULT_PAGE_SIZE, DEFAULT_TIMEZONE } from '../utils/constants';

interface UseMatchesOptions {
  timezone?: string;
  status?: string;
  tournamentIds?: number[];
  pageSize?: number;
}

export const useMatches = (options: UseMatchesOptions = {}) => {
  const {
    timezone = DEFAULT_TIMEZONE,
    status = 'all',
    tournamentIds,
    pageSize = DEFAULT_PAGE_SIZE,
  } = options;

  const query = useInfiniteQuery({
    queryKey: ['matches', { timezone, status, tournamentIds }],
    queryFn: async ({ pageParam = 0 }) => {
      const params: MatchListParams = {
        timezone,
        status,
        limit: pageSize,
        offset: pageParam,
        ...(tournamentIds?.length && { tournament_ids: tournamentIds.join(',') }),
      };

      return fetchMatches(params);
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  const matches: Match[] = query.data?.pages.flatMap((page) => page.matches) ?? [];
  const totalCount = query.data?.pages[0]?.total ?? 0;
  const hasNextPage = query.hasNextPage;
  const isFetchingNextPage = query.isFetchingNextPage;

  return {
    ...query,
    matches,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
  };
};
