import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AnyZodObject, ZodError } from 'zod';

import { ResponseOfError } from '../errors/ResponseOfError';
import { AppError } from '../errors/appError';
import { formatZodError } from '../errors/utils';
import { functionWrapper } from '../logging';

export const validateRequest = (reqSchema: AnyZodObject, resSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return functionWrapper(async () => {
      try {
        await validateAndUpdateRequestWithProvidedSchema(reqSchema, req);
        setResponseValidation(res, resSchema);
        return next();
      } catch (error) {
        return next(
          new ResponseOfError(httpStatus.CONFLICT, 'request did not passed route validations', (error as AppError).errorData),
        );
      }
    });
  };
};

const isZodError = (error: any): error is ZodError => {
  return error.issues !== undefined;
};

const validateAndUpdateRequestWithProvidedSchema = async (schema: AnyZodObject, req: Request) => {
  return functionWrapper(async () => {
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
  });
};

const setResponseValidation = (res: Response, resSchema: AnyZodObject) => {
  const send = res.send;
  (res as any).send = function (body: any) {
    const isErrorResponse = body.error;
    const isSecodndCall = typeof body === 'string';
    if (!body.error && !isSecodndCall) {
      validateResponseWithProvidedSchema(resSchema, body);
    }
    send.call(this, body);
  };
};

const validateResponseWithProvidedSchema = async (schema: AnyZodObject, body: any) => {
  return functionWrapper(async () => {
    try {
      await schema.parseAsync(body);
    } catch (error: any) {
      if (!isZodError(error)) {
        throw new AppError('COULD_NOT_VALIDATE_RESPONSE', { error: error.message });
      }
      const formattedErrorObject = formatZodError(error);
      throw new AppError('RESPONSE_VALIDATION_ERROR', { formattedErrorObject, body });
    }
  });
};
