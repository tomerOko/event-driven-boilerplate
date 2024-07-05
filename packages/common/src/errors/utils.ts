import { AppError } from '../errors/appErrors';
import { ZodError } from 'zod';

export const shouldBeHandled = (error: any) => {
  const appError = error as AppError;
  if (appError.isAppError && !!appError.isOperational) {
    return appError;
  }
  return null;
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
