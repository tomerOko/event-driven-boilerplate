import { log } from 'console';
import { NextFunction, Request, Response } from 'express';

import { getError, getTransactionId } from '../../asyncStorage';
import { LogParams } from '../formatLog';
import { logger, nativeLogger } from '../logger';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const { ip, method, originalUrl } = req;

  const messagePostfix = `| ${method} ${originalUrl}`;
  const logParams: LogParams = {
    message: `HTTP REQUEST ${messagePostfix}`,
    stage: 'incoming',
    additionalData: { ip },
    dontPrintFunctionName: true,
  };

  logger.http(logParams);

  logParams.message = messagePostfix;
  setListenerToLogResponse(res, logParams);

  return next();
};

const setListenerToLogResponse = (res: Response<any, Record<string, any>>, logParams: LogParams) => {
  const startTime = process.hrtime();
  res.on('finish', () => {
    (logParams.additionalData as Record<string, any>).responseTime = calculateResponseTime(startTime);
    if (res.statusCode >= 400) {
      logParams.message = `HTTP ERROR RESPONSE ${logParams.message}`;
      logParams.stage = 'error';
      logParams.error = getError();
    } else {
      logParams.message = `HTTP RESPONSE ${logParams.message}`;
      logParams.stage = 'finished';
    }
    logger.http(logParams);
  });
};

const calculateResponseTime = (startTime: [number, number]) => {
  const diff = process.hrtime(startTime);
  const responseTimeInMs = diff[0] * 1000 + diff[1] / 1000000;
  const result = (responseTimeInMs / 1000).toFixed(3) + ' seconds';
  return result;
};
