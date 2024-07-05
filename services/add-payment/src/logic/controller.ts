import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ObjectId } from 'mongodb';
import httpStatus from 'http-status';

export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /test');
  res.send('Test route');
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
