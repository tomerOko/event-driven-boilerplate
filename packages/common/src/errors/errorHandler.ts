import { NextFunction } from 'express';

import { ResponseOfError } from './ResponseOfError';
import { shouldBeHandled } from './utils';

export type ErrorHandlerParams = Record<string, ConstructorParameters<typeof ResponseOfError>>;

export const errorHandler = (params: ErrorHandlerParams) => {
  return (error: unknown, next: NextFunction) => {
    if (shouldBeHandled(error)) {
      const [statusCode, description, data] = params[error.errorCode];
      next(new ResponseOfError(statusCode, description, data));
      return;
    }
    return next(error);
  };
};
