import { errorHandler, functionWrapper, headerNames } from 'common-lib-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';
import { CreateUserPayload, SendPincodePayload, SignInPayload } from './validations';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({});
    }
  });
};

export const sendPincode = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      await service.sendPincode(req.body as SendPincodePayload);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      errorHandler({});
    }
  });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const userId = await service.createUser(req.body as CreateUserPayload);
      res.status(httpStatus.CREATED).send({ userId });
    } catch (error) {
      errorHandler({});
    }
  });
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const token = await service.signIn(req.body as SignInPayload);
      res.setHeader(headerNames.transactionId, token);
      res.status(httpStatus.OK).send();
    } catch (error) {
      errorHandler({});
    }
  });
};
