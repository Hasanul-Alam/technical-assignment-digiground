export interface Tournament {
  id: number;
  name: string;
  shortName?: string;
  logo?: string;
  sportId: number;
}

export interface Sport {
  id: number;
  sportName: string;
  tournaments: Tournament[];
}

export interface TournamentFilterState {
  selectedTournamentIds: number[];
  selectedSportIds: number[];
}

export interface FilterApplyResult {
  tournamentIds: number[];
  shouldRefresh: boolean;
}
