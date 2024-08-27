import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  sendMessageRequestType,
  sendMessageResponseType,
  createGroupRequestType,
  createGroupResponseType,
  joinGroupRequestType,
  joinGroupResponseType,
  leaveGroupRequestType,
  leaveGroupResponseType,
  getRecentChatsRequestType,
  getRecentChatsResponseType,
  getMessagesRequestType,
  getMessagesResponseType,
  searchMessagesRequestType,
  searchMessagesResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as sendMessageRequestType['body'];
      const result: sendMessageResponseType = await service.sendMessage(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as createGroupRequestType['body'];
      const result: createGroupResponseType = await service.createGroup(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const joinGroup = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as joinGroupRequestType['body'];
      const result: joinGroupResponseType = await service.joinGroup(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const leaveGroup = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as leaveGroupRequestType['body'];
      const result: leaveGroupResponseType = await service.leaveGroup(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getRecentChats = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const query = req.query as getRecentChatsRequestType['query'];
      const result: getRecentChatsResponseType = await service.getRecentChats(query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const query = req.query as getMessagesRequestType['query'];
      const result: getMessagesResponseType = await service.getMessages(query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const searchMessages = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const query = req.query as searchMessagesRequestType['query'];
      const result: searchMessagesResponseType = await service.searchMessages(query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};