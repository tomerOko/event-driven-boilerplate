//tomer todo: refactor this file, there is no separation of concerns, this file is doing 1) storage creation 2) usage as middleware 3) usage as utility functions
import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';
import { v4 as generateID } from 'uuid';

import { IdentificationHeaders } from '../logic/auth/typesAndConsts';
import { middlewareIterator } from '../utils/middlewareIterator';

const asyncLocalStorage = new AsyncLocalStorage<Record<string, any>>();

/* ASYNC STORAGE */
export const createLocalStorage = (req?: Request, res?: Response, next?: NextFunction) => {
  asyncLocalStorage.enterWith({});
  if (next) next();
  return;
};

const getAsyncStore = () => {
  const async_store = asyncLocalStorage.getStore();
  return async_store;
};

export const getFromAsyncStore = (key: string) => {
  const async_store = getAsyncStore();
  if (!async_store) return 'NO_ASYNC_STORE';
  if (!async_store[key]) return 'NO_ASYNC_STORE_KEY';
  return async_store[key];
};

export const setInAsyncStore = (key: string, value: any) => {
  const async_store = getAsyncStore();
  if (async_store) {
    async_store[key] = value;
  }
};

/* TRANSACTION ID */
const handleReqeustTransactionId = (req: Request, res: Response, next: NextFunction) => {
  /* in case the request came from another service in the cluster */
  const transactionId = insertTransactionIdToAsyncStorage(req?.headers['x-transaction-id'] as string);
  res.setHeader('x-transaction-id', transactionId);
  return next();
};

export const insertTransactionIdToAsyncStorage = (preDefinedTransactionId?: string) => {
  const transactionId = preDefinedTransactionId || generateID();
  setInAsyncStore('transactionId', transactionId);
  return transactionId;
};

/**
 * some of our code run in the server context (http/socket server listening on incoming
 * request, initializing asyncStore and trigger a flow accordingly) but some of our code
 * (same or different functions) is triggered by the program initialization (like module loading or db connection)
 */
export const getTransactionId = (safe = false): string | null => {
  const transaction_id = getFromAsyncStore('transactionId');
  return transaction_id as string;
};

/* IDENTIFICATION HEADERS */
const handleRequestIdentificationHeaders = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const userAgent = req.get('user-agent') as string;
  addIdentificationHeadersToAsyncStorage(ip, userAgent);
  return next();
};

export const addIdentificationHeadersToAsyncStorage = (ip: string, userAgent: string) => {
  const identificationHeaders = { ip, userAgent };
  setInAsyncStore('identificationHeaders', identificationHeaders);
};

export const getIdentificationHeaders = () => {
  const identificationHeaders = getFromAsyncStore('identificationHeaders');
  return identificationHeaders as IdentificationHeaders;
};

/* INITIALIZATION MIDDLEWARE */
export const initializeAsyncLocalStorage = middlewareIterator([
  createLocalStorage,
  handleReqeustTransactionId,
  handleRequestIdentificationHeaders,
]);

/* ERRORS */
export const setErrorInAsyncStore = (error: any) => {
  error = JSON.stringify(error);
  setInAsyncStore('error', error);
};

export const getErrorFromAsyncStore = () => {
  return getFromAsyncStore('error');
};
