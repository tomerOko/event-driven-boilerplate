//tomer todo: refactor this file, there is no separation of concerns, this file is doing 1) storage creation 2) usage as middleware 3) usage as utility functions
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as generateID } from 'uuid';

import { AppError } from '../errors/appError';
import { IdentificationHeaders } from '../typesAndConsts';

const asyncLocalStorage = new AsyncLocalStorage<Record<string, any>>();

/* initialize */
export const createAsyncLocalStorage = () => {
  asyncLocalStorage.enterWith({});
};

/* get/set */
const getAsyncStore = () => {
  const async_store = asyncLocalStorage.getStore();
  return async_store;
};

const getFromAsyncStore = (key: string) => {
  const async_store = getAsyncStore();
  if (!async_store) return 'NO_ASYNC_STORE';
  if (!async_store[key]) return 'NO_ASYNC_STORE_KEY';
  return async_store[key];
};

const setInAsyncStore = (key: string, value: any) => {
  const async_store = getAsyncStore();
  if (async_store) {
    async_store[key] = value;
  }
};

/* transactionId */
export const setTransactionId = (preDefinedTransactionId?: string) => {
  const transactionId = preDefinedTransactionId || generateID();
  setInAsyncStore('transactionId', transactionId);
  return transactionId;
};

/**
 * some of our code run in the server context (http/socket server listening on incoming
 * request, initializing asyncStore and trigger a flow accordingly) but some of our code
 * (same or different functions) is triggered by the program initialization (like module loading or db connection)
 */
export const getTransactionId = (): string | null => {
  const transaction_id = getFromAsyncStore('transactionId');
  return transaction_id as string;
};

/* headers */
export const setIdentificationHeaders = (ip: string, userAgent: string) => {
  const identificationHeaders = { ip, userAgent };
  setInAsyncStore('identificationHeaders', identificationHeaders);
};

export const getIdentificationHeaders = () => {
  const identificationHeaders = getFromAsyncStore('identificationHeaders');
  return identificationHeaders as IdentificationHeaders;
};

/* errors */
export const setError = (error: any) => {
  error = JSON.stringify(error);
  setInAsyncStore('error', error);
};

export const getError = (): AppError | null => {
  return getFromAsyncStore('error');
};

/* AuthenticatedEmail */
export const setAuthenticatedID = (ID: string) => {
  setInAsyncStore('authentication', ID);
};

export const getAuthenticatedID = (): string | null => {
  return getFromAsyncStore('authentication');
};
