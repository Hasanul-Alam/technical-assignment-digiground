import { MatchListParams, MatchListResponse } from '../types/match';
import apiClient from './api';

export const fetchMatches = async (params: MatchListParams): Promise<MatchListResponse> => {
  const queryParams = new URLSearchParams();
  
  queryParams.append('timezone', params.timezone);
  
  if (params.status) {
    queryParams.append('status', params.status);
  }
  if (params.todate) {
    queryParams.append('todate', params.todate);
  }
  if (params.tournament_ids) {
    queryParams.append('tournament_ids', params.tournament_ids);
  }
  if (params.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params.offset !== undefined) {
    queryParams.append('offset', params.offset.toString());
  }

  const response = await apiClient.get(`/sports/matchList?${queryParams.toString()}`);
  
  const data = response.data;
  
  return {
    matches: data.data || [],
    total: data.total || 0,
    offset: data.offset || 0,
    limit: data.limit || params.limit || 20,
  };
};
