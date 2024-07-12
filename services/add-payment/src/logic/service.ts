import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import { channel } from '../configs/rabbitConnections';

import * as model from './DAL';
import { AppErrorCodes } from './appErrorCodes';
import { CreatePaymentPayload, Payment, UpdatePaymentPayload } from './validations';

export const getAllPayments = async (): Promise<Array<Payment>> => {
  return functionWrapper(async () => {
    const payments = await model.getAllPayments();
    return payments;
  });
};

export const createPayment = async (props: CreatePaymentPayload) => {
  return functionWrapper(async () => {
    const { holderEmail } = props;
    const user = await model.getUserByEmail(holderEmail);
    if (!user) {
      throw new AppError(AppErrorCodes.CANT_CREATE_PAYMENT_WITHOUT_USER, { holderEmail });
    }
    const paymentId = await model.createPayment(props);
    return paymentId;
  });
};

export const updatePayment = async (props: UpdatePaymentPayload) => {
  return functionWrapper(async () => {
    const { _id, update } = props;
    await model.updatePayment(_id, update);
  });
};

export const deletePayment = async (paymentId: ObjectId) => {
  return functionWrapper(async () => {
    await model.deletePayment(paymentId);
  });
};

export const getPaymentById = async (paymentId: ObjectId) => {
  return functionWrapper(async () => {
    const payment = await model.getPaymentById(paymentId);
    return payment;
  });
};
