import { NextFunction, Request, Response } from 'express';

import { getError, getTransactionId } from '../../asyncStorage';
import { nativeLogger } from '../logger';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/static')) return next();

  const logBasis: Record<string, any> = buildLogBasis(req);
  logRequest(logBasis);
  setListenerToLogResponse(res, logBasis);

  return next();
};

const buildLogBasis = (req: Request) => {
  const { ip, method, originalUrl } = req;
  const transaction_id = getTransactionId();
  const baseLog: Record<string, any> = {
    transaction_id,
    ip,
    method,
    originalUrl,
  };
  return baseLog;
};

const logRequest = (logBasis: Record<string, any>) => {
  logBasis.stage = 'incoming';
  nativeLogger.http('HTTP REQUEST', logBasis);
};

const setListenerToLogResponse = (res: Response<any, Record<string, any>>, logBasis: Record<string, any>) => {
  const startTime = process.hrtime();
  res.on('finish', () => {
    logBasis.responseTime = calculateResponseTime(startTime);
    if (res.statusCode >= 400) {
      logError(logBasis);
    } else {
      logResponse(logBasis);
    }
  });
};

const calculateResponseTime = (startTime: [number, number]) => {
  const diff = process.hrtime(startTime);
  const responseTimeInMs = diff[0] * 1000 + diff[1] / 1000000;
  const result = (responseTimeInMs / 1000).toFixed(3) + ' seconds';
  return result;
};

const logError = (logBasis: Record<string, any>) => {
  logBasis.stage = 'error';
  try {
    logBasis.error = getError();
  } catch (e) {
    nativeLogger.error('Error parsing error from async store', e);
    logBasis.error(e);
  }
  nativeLogger.error('HTTP ERROR RESPONSE', logBasis);
};

const logResponse = (logBasis: Record<string, any>) => {
  logBasis.stage = 'finished';
  nativeLogger.http('HTTP RESPONSE', logBasis);
};
