import {
  AppError,
  ErrorHandlerParams,
  errorHandler,
  functionWrapper,
  getAuthenticatedID,
  headerNames,
} from 'common-lib-tomeroko3';
import { becomeTeacherRequestType, stopTeachRequestType, updateTeacherDetailsRequestType } from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

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
      const body = req.body as becomeTeacherRequestType['body'];
      await service.becemeTeacher(body);
      res.status(httpStatus.CREATED).send({});
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateTeacherDetails = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateTeacherDetailsRequestType['body'];
      await service.updateTeacherDetails(body);
      res.status(httpStatus.OK).send({});
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const stopTeach = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as stopTeachRequestType['body'];
      await service.stopTeach(body);
      res.status(httpStatus.OK).send({});
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
