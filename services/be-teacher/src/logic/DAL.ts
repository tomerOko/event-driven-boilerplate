import { functionWrapper } from 'common-lib-tomeroko3';

import { User } from '../configs/mongoDB';
import { Teacher, teachersCollection, usersCollection } from '../configs/mongoDB/initialization';

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await teachersCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });
};

export const createUser = async (payload: User) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(payload);
  });
};

export const updateUser = async (payload: User) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne;
  });
};

export const deleteUser = async (payload: User) => {
  return functionWrapper(async () => {
    await usersCollection.deleteOne(payload);
  });
};

export const findUser = async (filter: Partial<User>) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne(filter);
    return user;
    //TODO: maybe it should be findUserByEmail
  });
};

//create update delete find
export const createTeacher = async (payload: Teacher) => {
  return functionWrapper(async () => {
    await teachersCollection.insertOne(payload);
  });
};

export const updateTeacherByEmail = async (email: string, payload: Partial<Teacher>) => {
  return functionWrapper(async () => {
    await teachersCollection.updateOne({ email }, { $set: payload });
  });
};

export const deleteTeacherByMail = async (email: string) => {
  return functionWrapper(async () => {
    await teachersCollection.deleteOne({ email });
  });
};

export const findTeacher = async (payload: Partial<Teacher>) => {
  return functionWrapper(async () => {
    const teacher = await teachersCollection.findOne(payload);
    return teacher;
    //TODO: maybe it should be findTeacherByEmail
  });
};
