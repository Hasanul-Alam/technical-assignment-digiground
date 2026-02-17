export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface MatchListParams extends Partial<PaginationParams> {
  timezone: string;
  status?: string;
  todate?: string;
  tournament_ids?: string;
}

export interface TournamentSearchParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
