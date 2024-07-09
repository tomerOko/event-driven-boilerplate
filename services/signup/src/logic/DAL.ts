import { CollectionInitializerProps, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { Collection, ObjectId } from 'mongodb';

import { Payment } from './typesAndConsts';
import { UserDocument, pincodeDocumentValidation, userDocumentValidation } from './validations';

const pincodesInitializerProps: CollectionInitializerProps<Payment> = {
  collectionName: 'pincodes',
  documentSchema: pincodeDocumentValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const usersInitializerProps: CollectionInitializerProps<Payment> = {
  collectionName: 'users',
  documentSchema: userDocumentValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

let pincodesCollection: Collection<Payment>;
let usersCollection: Collection<Payment>;

export const initCollections = async () => {
  return functionWrapper(async () => {
    pincodesCollection = await collectionInitializer(pincodesInitializerProps);
    usersCollection = await collectionInitializer(usersInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await pincodesCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });
};

export const setPincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    await pincodesCollection.updateOne({ email }, { email, pincode }, { upsert: true });
  });
};

export const getPincode = async (email: string) => {
  return functionWrapper(async () => {
    const pincodeDocument = await pincodesCollection.findOne({ email });
    return pincodeDocument;
  });
};

export const createUser = async (props: UserDocument) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(props);
  });
};

export const getUserByEmail = async (email: string) => {
  return functionWrapper(async () => {
    const userDocument = await usersCollection.findOne({ email });
    return userDocument;
  });
};
