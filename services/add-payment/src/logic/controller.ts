import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';

import { AppError, ResponseOfError, errorStatuses, functionWrapper } from '../npm';

import * as service from './service';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      testy();
      await testAysnc();
      res.send('Test route');
    } catch (error) {
      next(new ResponseOfError(errorStatuses.BAD_INPUT, 'test error'));
    }
  });
};

const testy = () => {
  return functionWrapper(() => {
    throw new AppError('test');
    return 5;
  });
};

const testAysnc = async () => {
  return functionWrapper(async () => {
    await testAysnc2();
    return 5;
  });
};

const testAysnc2 = async () => {
  return functionWrapper(async () => {
    return 5;
  });
};

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /allPayments');
  const allPayments = await service.getAllPayments();
  res.send(allPayments);
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  console.log('POST /createPayment');
  const paymentId = await service.createPayment(req.body);
  res.status(httpStatus.CREATED).send({ paymentId });
};

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  console.log('PUT /updatePayment');
  req.body._id = new ObjectId(req.body._id as string); //todo: move conversion to validation transform
  await service.updatePayment(req.body);
  res.send('Payment updated');
};

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  console.log('DELETE /deletePayment');
  const paymentId = new ObjectId(req.params.paymentId); //todo: move conversion to validation transform
  await service.deletePayment(paymentId); //todo: move conversion to validation transform
  res.send('Payment deleted');
};

export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /getPaymentById');
  const paymentId = new ObjectId(req.params.paymentId); //todo: move conversion to validation transform
  const payment = await service.getPaymentById(paymentId);
  res.send({ payment });
};
