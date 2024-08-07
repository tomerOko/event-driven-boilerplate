import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  addTopicRequestType,
  addTopicResponseType,
  becomeTeacherRequestType,
  becomeTeacherResponseType,
  deleteTopicRequestType,
  deleteTopicResponseType,
  stopTeachRequestType,
  stopTeachResponseType,
  updateTeacherDetailsRequestType,
  updateTeacherDetailsResponseType,
  updateTopicRequestType,
  updateTopicResponseType,
} from 'events-tomeroko3';
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

export const becomeTeacher = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as becomeTeacherRequestType['body'];
      const result: becomeTeacherResponseType = await service.becemeTeacher(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateTeacherDetails = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateTeacherDetailsRequestType['body'];
      const result: updateTeacherDetailsResponseType = await service.updateTeacherDetails(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const stopTeach = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as stopTeachRequestType['body'];
      const result: stopTeachResponseType = await service.stopTeach(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const addTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as addTopicRequestType['body'];
      const result: addTopicResponseType = await service.addTopic(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateTopicRequestType['body'];
      const result: updateTopicResponseType = await service.updateTopic(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as deleteTopicRequestType['body'];
      const result: deleteTopicResponseType = await service.deleteTopic(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
