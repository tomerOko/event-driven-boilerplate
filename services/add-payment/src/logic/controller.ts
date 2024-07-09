import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';

import { AppError, ResponseOfError, errorStatuses, functionWrapper } from '../npm';

import * as service from './service';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(() => {
    try {
      res.send('Test route');
    } catch (error) {
      next(new ResponseOfError(errorStatuses.BAD_INPUT, 'test error'));
    }
  });
};

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  const allPayments = await service.getAllPayments();
  res.send(allPayments);
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  const paymentId = await service.createPayment(req.body);
  res.status(httpStatus.CREATED).send({ paymentId });
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  req.body._id = new ObjectId(req.body._id as string); //todo: move conversion to validation transform
  await service.updatePayment(req.body);
  res.send('Payment updated');
};

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  const paymentId = new ObjectId(req.params.paymentId); //todo: move conversion to validation transform
  await service.deletePayment(paymentId); //todo: move conversion to validation transform
  res.send('Payment deleted');
};

export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  const paymentId = new ObjectId(req.params.paymentId); //todo: move conversion to validation transform
  const payment = await service.getPaymentById(paymentId);
  res.send({ payment });
};
