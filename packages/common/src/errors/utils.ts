import { ZodError } from 'zod';

import { AppError } from './appError';

export const isAppError = (error: any): error is AppError => {
  return !!error?.isAppError;
};

//not all AppErrors should be handled, but still every error passing this function is an AppError
export const shouldBeHandled = (error: any): error is AppError => {
  if (isAppError(error)) {
    return error.isOperational;
  }
  return false;
};

export const formatZodError = (zodError: ZodError): Object => {
  const formattedError: Record<string, any> = {};
  zodError.issues.forEach((issue) => {
    const path = issue.path.join('.');
    (issue.path as any) = path;
    formattedError[path] = issue;
  });
  return formattedError;
};
