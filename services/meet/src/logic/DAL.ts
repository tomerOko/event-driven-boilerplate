import { CollectionInitializerProps, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { teacherValidationProps, userValidationProps } from 'events-tomeroko3';
import { Collection } from 'mongodb';
import { z } from 'zod';

const userValidation = z.object(userValidationProps);
export type User = z.infer<typeof userValidation>;
const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: userValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};
let usersCollection: Collection<User>;

const teacherValidation = z.object({ ...teacherValidationProps, fistName: z.string(), lastName: z.string() });
export type Teacher = z.infer<typeof teacherValidation>;
const teachersInitializerProps: CollectionInitializerProps<Teacher> = {
  collectionName: 'teachers',
  documentSchema: teacherValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};
let teachersCollection: Collection<Teacher>;

export const initCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    teachersCollection = await collectionInitializer(teachersInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await teachersCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });
};

//create update delete find
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

export const deleteTeacher = async (payload: Teacher) => {
  return functionWrapper(async () => {
    await teachersCollection.deleteOne(payload);
  });
};

export const findTeacher = async (payload: Partial<Teacher>) => {
  return functionWrapper(async () => {
    const teacher = await teachersCollection.findOne(payload);
    return teacher;
    //TODO: maybe it should be findTeacherByEmail
  });
};
