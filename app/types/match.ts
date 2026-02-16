export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo?: string;
  score?: string;
}

export interface Tournament {
  id: number;
  name: string;
  sportId: number;
  sportName: string;
}

export interface Match {
  id: number;
  matchId: number;
  matchName: string;
  tournament: Tournament;
  homeTeam: Team;
  awayTeam: Team;
  matchStatus: 'upcoming' | 'live' | 'completed';
  matchDate: string;
  matchTime: string;
  startTime: string;
  timezone: string;
  venue?: string;
}

export interface MatchListParams {
  timezone: string;
  status?: string;
  todate?: string;
  tournament_ids?: string;
  limit?: number;
  offset?: number;
}

export interface MatchListResponse {
  matches: Match[];
  total: number;
  offset: number;
  limit: number;
}
