import { NextFunction, Request, Response } from 'express';
import * as service from './service';

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
  await service.createPayment(req.body);
  res.send('Payment created');
}

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  console.log('PUT /updatePayment');
  await service.updatePayment(req.body);
  res.send('Payment updated');
}

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  console.log('DELETE /deletePayment');
  await service.deletePayment(req.body);
  res.send('Payment deleted');
}

export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /getPaymentById');
  const payment = await service.getPaymentById(req.body);
  res.send(payment);
}


