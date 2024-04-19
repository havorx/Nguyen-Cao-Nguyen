import { Response } from 'express';
import { HttpStatus, HttpStatusCode } from './constants';
import { logger } from './logger';

export function errorHelper(
  error: {
    errorType: keyof typeof HttpStatus.errorType;
    message?: string;
  },
  res: Response,
  defaultMessage: string,
) {
  logger.error(error, error.message ?? 'Internal error');

  return res
    .status(HttpStatusCode[error.errorType] ?? HttpStatusCode.INTERNAL_ERROR)
    .send({
      message: error.message ?? defaultMessage,
      errorType: error.errorType ?? HttpStatus.errorType.INTERNAL_ERROR,
    });
}
