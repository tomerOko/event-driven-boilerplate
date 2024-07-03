import { Payment } from "./typesAndConsts";
import * as model from './DAL'
import { getChannel } from "../configs/rabbitConnections";

export const getAllPayments = async () : Promise<Array<Payment>>=> {
  const payments = await model.getAllPayments()
  return payments
};

export const createPayment = async (payment: Payment) => {
  const queue = 'paymentQueue';

  try {
    const channel = getChannel();

    channel.assertQueue(queue, {
      durable: false
    });

    const msg = JSON.stringify({ type: 'new payment', data: payment });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

  } catch (error) {
    console.error('Error sending message to RabbitMQ', error);
  }
  await model.createPayment(payment)
}

export const updatePayment = async (payment: Payment) => {
  await model.updatePayment(payment)
}

export const deletePayment = async (paymentId: string) => {
  await model.deletePayment(paymentId)
}

export const getPaymentById = async (paymentId: string) => {
  const payment = await model.getPaymentById(paymentId)
  return payment
}