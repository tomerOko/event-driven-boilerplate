import { functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import { channel } from '../configs/rabbitConnections';

import * as model from './DAL';
import { Payment } from './typesAndConsts';

export const getAllPayments = async (): Promise<Array<Payment>> => {
  return functionWrapper(async () => {
    const payments = await model.getAllPayments();
    return payments;
  });
};

export const createPayment = async (payment: Payment) => {
  return functionWrapper(async () => {
    publishNewPaymentEvent(payment);
    const paymentId = await model.createPayment(payment);
    return paymentId;
  });
};

const publishNewPaymentEvent = (payment: Payment) => {
  return functionWrapper(async () => {
    const queueName = 'paymentQueue';
    channel.assertQueue(queueName, {
      durable: false,
    });
    const msg = JSON.stringify({ type: 'new payment', data: payment });
    channel.sendToQueue(queueName, Buffer.from(msg));
    console.log(' [x] Sent %s', msg);
  });
};

export const updatePayment = async (payment: Payment) => {
  return functionWrapper(async () => {
    await model.updatePayment(payment);
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
