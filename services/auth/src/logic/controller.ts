import { ErrorHandlerParams, errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { LoginRequest, LoginResponse } from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { appErrorCodes } from './appErrorCodes';
import * as service from './service';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const payload: LoginRequest['body'] = req.body;
      const response: LoginResponse = await service.login(payload);
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      handlerProps[appErrorCodes.BAD_GOOGLE_TOKEN] = [
        httpStatus.CONFLICT,
        'google token is not valid or does not match the user',
      ];
      handlerProps[appErrorCodes.CANT_LOGIN_UNKNOWN_METHOD] = [httpStatus.BAD_REQUEST, 'unknown login method'];
      handlerProps[appErrorCodes.CANT_LOGIN_USER_NOT_FOUND] = [httpStatus.NOT_FOUND, 'user not found'];
      handlerProps[appErrorCodes.REQUEST_VALIDATION_ERROR] = [httpStatus.BAD_REQUEST, 'request validation error'];
      handlerProps[appErrorCodes.TOKEN_DOSE_NOT_MATCH_USER] = [httpStatus.CONFLICT, 'token does not match the user'];
      errorHandler(handlerProps)(error, next);
    }
  });
};
