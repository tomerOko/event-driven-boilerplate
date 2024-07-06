//tomer todo: refactor this file, there is no separation of concerns, this file is doing 1) storage creation 2) usage as middleware 3) usage as utility functions
import { NextFunction, Request, Response } from 'express';

import { headerNames } from '../../typesAndConsts';
import { middlewareIterator } from '../../utils/middlewareIterator';
import { createAsyncLocalStorage, setIdentificationHeaders, setTransactionId } from '../utils';

/* ASYNC STORAGE */
const initializeLocalStorage = (req?: Request, res?: Response, next?: NextFunction) => {
  createAsyncLocalStorage();
  if (next) next();
  return;
};

/* TRANSACTION ID */
const transactionIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  /* in case the request came from another service in the cluster */
  const transactionId = setTransactionId(req?.headers[headerNames.transactionId] as string);
  res.setHeader(headerNames.transactionId, transactionId);
  return next();
};

/* IDENTIFICATION HEADERS */
const identificationHeadersMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip as string;
  const userAgent = req.get('user-agent') as string;
  setIdentificationHeaders(ip, userAgent);
  return next();
};

/* INITIALIZATION MIDDLEWARE */
export const newRequestStorage = middlewareIterator([
  initializeLocalStorage,
  transactionIdMiddleware,
  identificationHeadersMiddleware,
]);
