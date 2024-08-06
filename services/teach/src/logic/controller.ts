import { becomeTeacherRequestType } from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { ErrorHandlerParams, errorHandler, functionWrapper, getAuthenticatedEmail, headerNames } from '@src/testy/src/index';

import { appErrorCodes } from './appErrorCodes';
import * as service from './service';
import { SendPincodePayload, SignupPayload } from './validations';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const becomeTeacher = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const email = getAuthenticatedEmail();
      if (!email) {
        throw new ErrorHandlerParams(appErrorCodes.UNAUTHORIZED, 'You must be logged in to become a teacher');
      }
      const body = req.body as becomeTeacherRequestType['body'];
      if (email !== body.email) {
        throw new ErrorHandlerParams(appErrorCodes.UNAUTHORIZED, 'You can only become a teacher with your own account');
      }

      await service.becemeTeacher(body);
      res.status(httpStatus.CREATED).send({});
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
