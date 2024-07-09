import { CollectionInitializerProps, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { Collection, ObjectId } from 'mongodb';

import { Payment } from './typesAndConsts';
import { paymentValidation } from './validations';

const collectionInitializerProps: CollectionInitializerProps<Payment> = {
  collectionName: 'payments',
  documentSchema: paymentValidation,
  indexSpecs: [{ key: { _id: 1 }, name: 'cardNumber' }],
};

let paymentsCollection: Collection<Payment>;

export const initPaymentsCollection = async () => {
  return functionWrapper(async () => {
    paymentsCollection = await collectionInitializer(collectionInitializerProps);
  });
};

export const getAllPayments = async (): Promise<Payment[]> => {
  return functionWrapper(async () => {
    const payments = await paymentsCollection.find().toArray();
    return payments;
  });
};

export const createPayment = async (payment: Payment) => {
  return functionWrapper(async () => {
    const result = await paymentsCollection.insertOne(payment as any);
    return result.insertedId;
  });
};

export const updatePayment = async (_id: ObjectId, update: Partial<Payment>) => {
  return functionWrapper(async () => {
    await paymentsCollection.updateOne({ _id }, { $set: update });
  });
};

export const deletePayment = async (_id: ObjectId) => {
  return functionWrapper(async () => {
    await paymentsCollection.deleteOne({ _id });
  });
};

export const getPaymentById = async (_id: ObjectId) => {
  return functionWrapper(async () => {
    const asObjectId = new ObjectId(_id);
    const payment = (await paymentsCollection.findOne({ _id: asObjectId })) as any as Payment;
    return payment;
  });
};

export const cleanrCollection = async () => {
  return functionWrapper(async () => {
    await paymentsCollection.deleteMany({});
  });
};
