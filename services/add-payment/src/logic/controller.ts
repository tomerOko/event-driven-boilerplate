import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';

import * as service from './service';
import { CreatePaymentPayload, UpdatePaymentPayload } from './validations';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const allPayments = await service.getAllPayments();
      res.send(allPayments);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const paymentId = await service.createPayment(req.body as CreatePaymentPayload);
      res.status(httpStatus.CREATED).send({ paymentId });
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      await service.updatePayment(req.body as UpdatePaymentPayload);
      res.send('Payment updated');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      await service.deletePayment(req.params._id as any as ObjectId); //todo: move conversion to validation transform
      res.send('Payment deleted');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const payment = await service.getPaymentById(req.params._id as any as ObjectId);
      res.send({ payment });
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
