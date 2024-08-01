import {
  CollectionInitializerProps,
  CustomCollection,
  WithOptionalID,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { Collection } from 'mongodb';

import { Pincode, User, pincodeValidation, userValidation } from './validations';

const pincodesInitializerProps: CollectionInitializerProps<Pincode> = {
  collectionName: 'pincodes',
  documentSchema: pincodeValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: userValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

let pincodesCollection: CustomCollection<Pincode>;
let usersCollection: CustomCollection<User>;

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
    await pincodesCollection.updateOne(
      { email },
      {
        $set: {
          email,
          pincode,
        },
      },
      { upsert: true },
    );
  });
};

export const getPincode = async (email: string) => {
  return functionWrapper(async () => {
    const pincodeDocument = await pincodesCollection.findOne({ email });
    return pincodeDocument;
  });
};

export const signup = async (props: WithOptionalID<User>) => {
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
