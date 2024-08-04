import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { User, usersCollection } from '../configs/mongoDB/initialization';

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
