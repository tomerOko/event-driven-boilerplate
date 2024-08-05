import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { signupDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { pincode, user } = signupDbValidations;

export type Pincode = z.infer<typeof pincode>;
export type User = z.infer<typeof user>;

const pincodesInitializerProps: CollectionInitializerProps<Pincode> = {
  collectionName: 'pincodes',
  documentSchema: pincode,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

export let pincodesCollection: SafeCollection<Pincode>;
export let usersCollection: SafeCollection<User>;

export const initializeCollections = async () => {
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
