/** Standard API response envelope used by all endpoints */
export interface ApiResponse<T> {
  data: T;
  error: null;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  data: null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/** Cursor-based pagination meta */
export interface PaginationMeta {
  cursor?: string;
  hasMore: boolean;
  total?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  error: null;
  meta: PaginationMeta;
}
