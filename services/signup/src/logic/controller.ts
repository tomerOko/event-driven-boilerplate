import { ErrorHandlerParams, errorHandler, functionWrapper, headerNames } from 'common-lib-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { appErrorCodes } from './appErrorCodes';
import * as service from './service';
import { errorHandlerr } from './testy';
import { SendPincodePayload } from './validations';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const sendPincode = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      await service.sendPincode(req.body as SendPincodePayload);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const userId = await service.createUser(req.body as CreateUserPayload);
      res.status(httpStatus.CREATED).send({ userId });
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      handlerProps[appErrorCodes.WRONG_PINCODE] = [httpStatus.CONFLICT, 'user entered wrong pincode'];
      handlerProps[appErrorCodes.PINCODE_NOT_FOUND] = [
        httpStatus.CONFLICT,
        'user didnt got a pincode, please send pincode first',
      ];
      errorHandlerr(handlerProps)(error, next);
    }
  });
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const token = await service.signIn(req.body as SignInPayload);
      res.setHeader(headerNames.accessToken, token);
      res.status(httpStatus.OK).send();
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      handlerProps[appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND] = [httpStatus.CONFLICT, 'user with this email not found'];
      handlerProps[appErrorCodes.WRONG_PASSWORD] = [httpStatus.CONFLICT, 'user entered wrong password'];
      errorHandler(handlerProps)(error, next);
    }
  });
};
