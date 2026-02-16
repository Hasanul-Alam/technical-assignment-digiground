import { AllSportsAndLeaguesParams, AllSportsAndLeaguesResponse, SportWithTournaments } from '../types/tournament';
import apiClient from './api';

// Mock data for demonstration - set to false when real API is available
const USE_MOCK_DATA = true;

const mockSports: SportWithTournaments[] = [
  { id: 4, sportName: 'Cricket', tournaments: [{ id: 101, name: 'India Test Series' }, { id: 102, name: 'Big Bash League' }, { id: 104, name: 'Ashes Series' }] },
  { id: 8, sportName: 'Soccer', tournaments: [{ id: 201, name: 'Premier League' }, { id: 202, name: 'La Liga' }, { id: 205, name: 'A-League' }] },
  { id: 9, sportName: 'Australian Rules', tournaments: [{ id: 301, name: 'AFL Premiership' }] },
  { id: 10, sportName: 'Basketball', tournaments: [{ id: 401, name: 'NBA' }, { id: 402, name: 'NBL Australia' }] },
  { id: 12, sportName: 'Rugby League', tournaments: [{ id: 501, name: 'NRL' }, { id: 502, name: 'State of Origin' }] },
];

export const fetchTournaments = async (params: AllSportsAndLeaguesParams = {}): Promise<AllSportsAndLeaguesResponse> => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { sports: mockSports };
  }

  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append('search', params.search);
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());

  const queryString = queryParams.toString();
  const url = `/sports/AllSportsAndLeagues${queryString ? `?${queryString}` : ''}`;
  const response = await apiClient.get(url);
  const data = response.data;
  const sports: SportWithTournaments[] = (data.data || []).map((sport: any) => ({
    id: sport.id,
    sportName: sport.sportName,
    tournaments: (sport.tournaments || []).map((t: any) => ({ id: t.id, name: t.name })),
  }));
  return { sports };
};