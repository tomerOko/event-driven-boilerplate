import { CollectionInitializerProps, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { Collection, ObjectId } from 'mongodb';

import { Payment, User, userValidation } from './validations';
import { paymentValidation } from './validations';

const paymentsCollectionInitializerProps: CollectionInitializerProps<Payment> = {
  collectionName: 'payments',
  documentSchema: paymentValidation,
  indexSpecs: [{ key: { cardNumber: 1 }, name: 'cardNumber' }],
};

let paymentsCollection: Collection<Payment>;

const usersCollectionInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: userValidation,
  indexSpecs: [{ key: { email: 1 }, name: 'email' }],
};
let usersCollection: Collection<User>;

export const initCollections = async () => {
  return functionWrapper(async () => {
    paymentsCollection = await collectionInitializer(paymentsCollectionInitializerProps);
    usersCollection = await collectionInitializer(usersCollectionInitializerProps);
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

export const cleanrCollections = async () => {
  return functionWrapper(async () => {
    await paymentsCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });
};

export const getUserByEmail = async (email: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({
      email,
    });
    return user;
  });
};

export const saveNewUser = async (user: User) => {
  return functionWrapper(async () => {
    const result = await usersCollection.insertOne(user as any);
    return result.insertedId;
  });
};
