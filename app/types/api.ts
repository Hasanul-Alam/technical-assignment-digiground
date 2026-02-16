export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginationInfo {
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}
