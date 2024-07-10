import { ResponseOfError, functionWrapper, shouldBeHandled } from 'common-lib-tomeroko3';
import { NextFunction } from 'express';
import httpStatus from 'http-status';

export type ErrorHandlerParams = Record<string, ConstructorParameters<typeof ResponseOfError>>;

export const errorHandlerr = (params: ErrorHandlerParams) => {
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
