import { ErrorHandlerParams, errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { BeTeacherDeleteRequest, BeTeacherPostRequest, BeTeacherPutRequest } from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

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

export const becomeTeacher = async (req: Request<any, any, BeTeacherPostRequest['body']>, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const payload = req.body;
      await service.becomeTeacher(payload);
      res.status(httpStatus.OK).send({});
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      // handlerProps[appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND] = [httpStatus.CONFLICT, 'user with this email not found'];
      // handlerProps[appErrorCodes.WRONG_PASSWORD] = [httpStatus.CONFLICT, 'user entered wrong password'];
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const updateTeacherDetails = async (
  req: Request<any, any, BeTeacherPutRequest['body']>,
  res: Response,
  next: NextFunction,
) => {
  return functionWrapper(async () => {
    try {
      const payload = req.body;
      await service.updateTeacherDetails(payload);
      res.status(httpStatus.OK).send({});
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      // handlerProps[appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND] = [httpStatus.CONFLICT, 'user with this email not found'];
      // handlerProps[appErrorCodes.WRONG_PASSWORD] = [httpStatus.CONFLICT, 'user entered wrong password'];
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const stopTeach = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const params = req.params as BeTeacherDeleteRequest['params'];
      await service.stopTeach(params);
      res.status(httpStatus.OK).send({});
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      // handlerProps[appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND] = [httpStatus.CONFLICT, 'user with this email not found'];
      // handlerProps[appErrorCodes.WRONG_PASSWORD] = [httpStatus.CONFLICT, 'user entered wrong password'];
      errorHandler(handlerProps)(error, next);
    }
  });
};