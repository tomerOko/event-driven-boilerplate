import { Payment } from "./typesAndConsts";
import * as model from './DAL'
import { channel } from "../configs/rabbitConnections";
import { ObjectId } from "mongodb";

export const getAllPayments = async () : Promise<Array<Payment>>=> {
  const payments = await model.getAllPayments()
  return payments
};

export const createPayment = async (payment: Payment) => {
  const queue = 'paymentQueue';
  publishNewPaymentEvent(queue, payment);
  const paymentId = await model.createPayment(payment)
  return paymentId
}

const publishNewPaymentEvent = (queue: string, payment: Payment) => {
  try {
    channel.assertQueue(queue, {
      durable: false
    });
    const msg = JSON.stringify({ type: 'new payment', data: payment });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  } catch (error) {
    console.error('Error sending message to RabbitMQ', error);
  }
}

export const updatePayment = async (payment: Payment) => {
  await model.updatePayment(payment)
}

export const deletePayment = async (paymentId: ObjectId) => {
  await model.deletePayment(paymentId)
}

export const getPaymentById = async (paymentId: ObjectId) => {
  const payment = await model.getPaymentById(paymentId)
  return payment
}

