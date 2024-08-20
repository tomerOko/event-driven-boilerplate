import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { paymentDbValidations, signupDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { paymentMethod, user, withdrawMethod } = paymentDbValidations;

export type User = z.infer<typeof user>;
export type PaymentMethod = z.infer<typeof paymentMethod>;
export type WithdrawMethod = z.infer<typeof withdrawMethod>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const paymentMethodsInitializerProps: CollectionInitializerProps<PaymentMethod> = {
  collectionName: 'paymentMethods',
  documentSchema: paymentMethod,
  indexSpecs: [],
};

const withdrawMethodsInitializerProps: CollectionInitializerProps<WithdrawMethod> = {
  collectionName: 'withdrawMethods',
  documentSchema: withdrawMethod,
  indexSpecs: [{ key: { userId: 1 }, unique: true }],
};

export let usersCollection: SafeCollection<User>;
export let paymentMethodsCollection: SafeCollection<PaymentMethod>;
export let withdrawMethodsCollection: SafeCollection<WithdrawMethod>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    paymentMethodsCollection = await collectionInitializer(paymentMethodsInitializerProps);
    withdrawMethodsCollection = await collectionInitializer(withdrawMethodsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await paymentMethodsCollection.deleteMany({});
    await withdrawMethodsCollection.deleteMany({});
  });
};
