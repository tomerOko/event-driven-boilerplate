import { NextFunction } from 'express';
import httpStatus from 'http-status';

import { functionWrapper } from '../logging';

import { ResponseOfError } from './ResponseOfError';
import { shouldBeHandled } from './utils';

export type ErrorHandlerParams = Record<string, ConstructorParameters<typeof ResponseOfError>>;

export const errorHandler = (params: ErrorHandlerParams) => {
  return (error: unknown, next: NextFunction) => {
    return functionWrapper(() => {
      if (shouldBeHandled(error)) {
        const [statusCode, description, data] = params[error.errorCode] || [
          httpStatus.INTERNAL_SERVER_ERROR,
          'no handler found for this error',
        ];
        next(new ResponseOfError(statusCode, description, data));
        return;
      }
      return next(error);
    });
  };
};
