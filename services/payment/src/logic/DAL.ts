import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { User, paymentMethodsCollection, usersCollection } from '../configs/mongoDB/initialization';
import { PaymentMethod, WithdrawMethod, withdrawMethodsCollection } from '../configs/mongoDB/initialization';

export const insertUser = async (props: OptionalID<User>) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(props);
  });
};

export const updateUser = async (ID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const getUserByEmail = async (email: string) => {
  return functionWrapper(async () => {
    const userDocument = await usersCollection.findOne({ email });
    return userDocument;
  });
};

export const getUserById = async (ID: string) => {
  return functionWrapper(async () => {
    const userDocument = await usersCollection.findOne({ ID });
    return userDocument;
  });
};

export const getPaymentMethodById = async (paymentMethodID: string) => {
  return functionWrapper(async () => {
    const paymentMethodDocument = await paymentMethodsCollection.findOne({ ID: paymentMethodID });
    return paymentMethodDocument;
  });
};

export const getPaymentMethodsByUserId = async (userID: string) => {
  return functionWrapper(async () => {
    const paymentMethods = await paymentMethodsCollection.find({ userID }).toArray();
    return paymentMethods;
  });
};

export const insertPaymentMethod = async (props: OptionalID<PaymentMethod>) => {
  return functionWrapper(async () => {
    const result = await paymentMethodsCollection.insertOne(props);
    return result;
  });
};

export const updatePaymentMethodByID = async (ID: string, update: Partial<PaymentMethod>) => {
  return functionWrapper(async () => {
    await paymentMethodsCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deletePaymentMethodByID = async (ID: string) => {
  return functionWrapper(async () => {
    await paymentMethodsCollection.deleteOne({ ID });
  });
};

export const getWithdrawMethodById = async (withdrawMethodID: string) => {
  return functionWrapper(async () => {
    const withdrawMethodDocument = await withdrawMethodsCollection.findOne({ ID: withdrawMethodID });
    return withdrawMethodDocument;
  });
};

export const getWithdrawMethodsByUserId = async (userID: string) => {
  return functionWrapper(async () => {
    const withdrawMethods = await withdrawMethodsCollection.find({ userID }).toArray();
    return withdrawMethods;
  });
};

export const insertWithdrawMethod = async (props: OptionalID<WithdrawMethod>) => {
  return functionWrapper(async () => {
    const result = await withdrawMethodsCollection.insertOne(props);
    return result;
  });
};

export const updateWithdrawMethodByID = async (ID: string, update: Partial<WithdrawMethod>) => {
  return functionWrapper(async () => {
    await withdrawMethodsCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteWithdrawMethodByID = async (ID: string) => {
  return functionWrapper(async () => {
    await withdrawMethodsCollection.deleteOne({ ID });
  });
};
