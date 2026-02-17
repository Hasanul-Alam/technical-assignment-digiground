export interface Match {
  id: number;
  sportId: number;
  sportName: string;
  tournamentId: number;
  tournamentName: string;
  homeTeam: Team;
  awayTeam: Team;
  matchTime: string;
  status: MatchStatus;
  venue?: string;
  round?: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  score?: number;
}

export enum MatchStatus {
  UPCOMING = "upcoming",
  LIVE = "live",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface MatchListResponse {
  matches: Match[];
  total: number;
  hasMore: boolean;
}

export interface GroupedMatches {
  date: string;
  matches: Match[];
}
