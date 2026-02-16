import { MatchListParams, MatchListResponse } from '../types/match';
import apiClient from './api';

// Mock data for demonstration - set to false when real API is available
const USE_MOCK_DATA = true;

const generateMockMatches = (offset: number, limit: number, tournamentIds?: number[]) => {
  const allMatches: MatchListResponse['matches'] = [
    {
      id: 1,
      matchId: 1001,
      matchName: 'India vs Australia',
      tournament: { id: 101, name: 'India Test Series', sportId: 4, sportName: 'Cricket' },
      homeTeam: { id: 1, name: 'India', shortName: 'IND' },
      awayTeam: { id: 2, name: 'Australia', shortName: 'AUS' },
      matchStatus: 'upcoming',
      matchDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      matchTime: '10:00 AM',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
    },
    {
      id: 2,
      matchId: 1002,
      matchName: 'England vs New Zealand',
      tournament: { id: 104, name: 'Ashes Series', sportId: 4, sportName: 'Cricket' },
      homeTeam: { id: 3, name: 'England', shortName: 'ENG' },
      awayTeam: { id: 4, name: 'New Zealand', shortName: 'NZ' },
      matchStatus: 'live',
      matchDate: new Date().toISOString(),
      matchTime: '02:30 PM',
      startTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
    },
    {
      id: 3,
      matchId: 2001,
      matchName: 'Manchester United vs Liverpool',
      tournament: { id: 201, name: 'Premier League', sportId: 8, sportName: 'Soccer' },
      homeTeam: { id: 11, name: 'Manchester United', shortName: 'MUN' },
      awayTeam: { id: 12, name: 'Liverpool', shortName: 'LIV' },
      matchStatus: 'upcoming',
      matchDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      matchTime: '08:00 PM',
      startTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
    },
    {
      id: 4,
      matchId: 3001,
      matchName: 'Sydney Swans vs Collingwood',
      tournament: { id: 301, name: 'AFL Premiership', sportId: 9, sportName: 'Australian Rules' },
      homeTeam: { id: 21, name: 'Sydney Swans', shortName: 'SYD' },
      awayTeam: { id: 22, name: 'Collingwood', shortName: 'COL' },
      matchStatus: 'upcoming',
      matchDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      matchTime: '03:20 PM',
      startTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
    },
    {
      id: 5,
      matchId: 4001,
      matchName: 'Lakers vs Warriors',
      tournament: { id: 401, name: 'NBA', sportId: 10, sportName: 'Basketball' },
      homeTeam: { id: 31, name: 'Los Angeles Lakers', shortName: 'LAL' },
      awayTeam: { id: 32, name: 'Golden State Warriors', shortName: 'GSW' },
      matchStatus: 'upcoming',
      matchDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      matchTime: '12:00 PM',
      startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
    },
    {
      id: 6,
      matchId: 5001,
      matchName: 'Penrith Panthers vs Melbourne Storm',
      tournament: { id: 501, name: 'NRL', sportId: 12, sportName: 'Rugby League' },
      homeTeam: { id: 41, name: 'Penrith Panthers', shortName: 'PEN' },
      awayTeam: { id: 42, name: 'Melbourne Storm', shortName: 'MEL' },
      matchStatus: 'upcoming',
      matchDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      matchTime: '07:50 PM',
      startTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
    },
  ];

  let filtered = allMatches;
  if (tournamentIds && tournamentIds.length > 0) {
    filtered = allMatches.filter(m => tournamentIds.includes(m.tournament.id));
  }

  return filtered.slice(offset, offset + limit);
};

export const fetchMatches = async (params: MatchListParams): Promise<MatchListResponse> => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tournamentIds = params.tournament_ids 
      ? params.tournament_ids.split(',').map(id => parseInt(id, 10))
      : undefined;
    const matches = generateMockMatches(params.offset || 0, params.limit || 20, tournamentIds);
    return { matches, total: 6, offset: params.offset || 0, limit: params.limit || 20 };
  }

  const queryParams = new URLSearchParams();
  queryParams.append('timezone', params.timezone);
  if (params.status) queryParams.append('status', params.status);
  if (params.todate) queryParams.append('todate', params.todate);
  if (params.tournament_ids) queryParams.append('tournament_ids', params.tournament_ids);
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());

  const response = await apiClient.get(`/sports/matchList?${queryParams.toString()}`);
  const data = response.data;
  return {
    matches: data.data || [],
    total: data.total || 0,
    offset: data.offset || 0,
    limit: data.limit || params.limit || 20,
  };
};