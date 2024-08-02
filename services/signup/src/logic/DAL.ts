import { WithOptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { User, pincodesCollection, usersCollection } from '../configs/mongoDB/initialization';

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
