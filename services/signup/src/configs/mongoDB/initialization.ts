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
export let usersCollection: Collection<User>;

const teacherValidation = z.object({ ...teacherValidationProps, fistName: z.string(), lastName: z.string() });
export type Teacher = z.infer<typeof teacherValidation>;
const teachersInitializerProps: CollectionInitializerProps<Teacher> = {
  collectionName: 'teachers',
  documentSchema: teacherValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};
export let teachersCollection: Collection<Teacher>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    teachersCollection = await collectionInitializer(teachersInitializerProps);
  });
};
