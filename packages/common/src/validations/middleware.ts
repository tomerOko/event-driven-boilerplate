import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AnyZodObject, ZodError } from 'zod';

import { ResponseOfError } from '../errors/ResponseOfError';
import { AppError } from '../errors/appError';
import { formatZodError } from '../errors/utils';

export const validateRequest = (reqSchema: AnyZodObject, resSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateAndUpdateRequestWithProvidedSchema(reqSchema, req);
      // set listener to response object to validate response
      res.on('finish', () => {
        validateResponseWithProvidedSchema(resSchema, res);
      });
      return next();
    } catch (error) {
      return next(
        new ResponseOfError(httpStatus.CONFLICT, 'request did not passed route validations', (error as AppError).errorData),
      );
    }
  };
};

const isZodError = (error: any): error is ZodError => {
  return error.issues !== undefined;
};

const validateAndUpdateRequestWithProvidedSchema = async (schema: AnyZodObject, req: Request) => {
  try {
    const { body, query, params } = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = body;
    req.query = query;
    req.params = params;
  } catch (error: any) {
    if (!isZodError(error)) {
      throw new AppError('COULD_NOT_VALIDATE_REQUEST', { error: error.message });
    }
    const formattedErrorObject = formatZodError(error);
    throw new AppError('REQUEST_VALIDATION_ERROR', formattedErrorObject);
  }
};

const validateResponseWithProvidedSchema = async (schema: AnyZodObject, res: Response) => {
  try {
    await schema.parseAsync(res.locals.response);
  } catch (error: any) {
    if (!isZodError(error)) {
      throw new AppError('COULD_NOT_VALIDATE_RESPONSE', { error: error.message });
    }
    const formattedErrorObject = formatZodError(error);
    throw new AppError('RESPONSE_VALIDATION_ERROR', formattedErrorObject);
  }
};
