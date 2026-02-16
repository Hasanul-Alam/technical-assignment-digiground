export interface TournamentItem {
  id: number;
  name: string;
}

export interface SportWithTournaments {
  id: number;
  sportName: string;
  tournaments: TournamentItem[];
}

export interface AllSportsAndLeaguesParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface AllSportsAndLeaguesResponse {
  sports: SportWithTournaments[];
}

export const SUPPORTED_SPORTS = {
  CRICKET: { id: 4, name: 'Cricket' },
  SOCCER: { id: 8, name: 'Soccer' },
  AUSTRALIAN_RULES: { id: 9, name: 'Australian Rules' },
  BASKETBALL: { id: 10, name: 'Basketball' },
  RUGBY_LEAGUE: { id: 12, name: 'Rugby League' },
} as const;

export type SportId = typeof SUPPORTED_SPORTS[keyof typeof SUPPORTED_SPORTS]['id'];
