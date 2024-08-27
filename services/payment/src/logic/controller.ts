import { ErrorHandlerParams, errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  addPaymentMethodRequestType,
  addPaymentMethodResponseType,
  addWithdrawMethodRequestType,
  addWithdrawMethodResponseType,
  deletePaymentMethodRequestType,
  deletePaymentMethodResponseType,
  deleteWithdrawMethodRequestType,
  deleteWithdrawMethodResponseType,
  getPaymentMethodResponseType,
  getWithdrawMethodsResponseType,
  updatePaymentMethodRequestType,
  updatePaymentMethodResponseType,
  updateWithdrawMethodRequestType,
  updateWithdrawMethodResponseType,
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

export const getUserPaymentMethods = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: getPaymentMethodResponseType['body'] = await service.getUserPaymentMethods();
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      // handlerProps[appErrorCodes.WRONG_PINCODE] = [httpStatus.CONFLICT, 'user entered wrong pincode'];
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const addPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: addPaymentMethodResponseType = await service.addPaymentMethod(
        req.body as addPaymentMethodRequestType['body'],
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      // handlerProps[appErrorCodes.WRONG_PINCODE] = [httpStatus.CONFLICT, 'user entered wrong pincode'];
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const deletePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: deletePaymentMethodResponseType = await service.deletePaymentMethod(
        req.body as deletePaymentMethodRequestType['body'],
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const updatePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: updatePaymentMethodResponseType = await service.updatePaymentMethod(
        req.body as updatePaymentMethodRequestType['body'],
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const getUserWithdrawMethods = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: getWithdrawMethodsResponseType = await service.getUserWithdrawMethods();
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const addWithdrawMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: addWithdrawMethodResponseType = await service.addWithdrawMethod(
        req.body as addWithdrawMethodRequestType['body'],
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const deleteWithdrawMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: deleteWithdrawMethodResponseType = await service.deleteWithdrawMethod(
        req.body as deleteWithdrawMethodRequestType['body'],
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      errorHandler(handlerProps)(error, next);
    }
  });
};

export const updateWithdrawMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: updateWithdrawMethodResponseType = await service.updateWithdrawMethod(
        req.body as updateWithdrawMethodRequestType['body'],
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handlerProps: ErrorHandlerParams = {};
      errorHandler(handlerProps)(error, next);
    }
  });
};
