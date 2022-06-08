export interface ApiResponse<T = void> {
  statusCode: string;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  data: T[];
  totalPages: number;
}
