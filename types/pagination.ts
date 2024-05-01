export type PaginationOption =
  | { page: number; limit?: never }
  | { page?: never; limit: number };
