import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { User, pincodesCollection, usersCollection } from '../configs/mongoDB/initialization';

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await pincodesCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });
};

export const setPincode = async (userEmail: string, pincode: string) => {
  return functionWrapper(async () => {
    await pincodesCollection.updateOne({
      filter: { userEmail },
      update: {
        userEmail,
        pincode,
      },
      options: { upsert: true },
    });
  });
};

export const getPincode = async (email: string) => {
  return functionWrapper(async () => {
    const pincodeDocument = await pincodesCollection.findOne({ email });
    return pincodeDocument;
  });
};

export const signup = async (props: OptionalID<User>) => {
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
