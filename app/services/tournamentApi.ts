import { AllSportsAndLeaguesParams, AllSportsAndLeaguesResponse, SportWithTournaments } from '../types/tournament';
import apiClient from './api';

export const fetchTournaments = async (params: AllSportsAndLeaguesParams = {}): Promise<AllSportsAndLeaguesResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  if (params.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params.offset !== undefined) {
    queryParams.append('offset', params.offset.toString());
  }

  const queryString = queryParams.toString();
  const url = `/sports/AllSportsAndLeagues${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get(url);
  
  const data = response.data;
  
  const sports: SportWithTournaments[] = (data.data || []).map((sport: any) => ({
    id: sport.id,
    sportName: sport.sportName,
    tournaments: (sport.tournaments || []).map((t: any) => ({
      id: t.id,
      name: t.name,
    })),
  }));

  return { sports };
};
