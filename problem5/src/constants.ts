export enum ComparisonType {
  LESS_THAN = 'lt',
  LESS_OR_EQUAL = 'lte',
  GREATER_THAN = 'gt',
  GREATER_OR_EQUAL = 'gte',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const HttpStatus = {
  errorType: {
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  },
} as const;

export enum HttpStatusCode {
  NOT_FOUND = 403,
  INTERNAL_ERROR = 500,
}
