import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { teachDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { teacher, user, topic } = teachDbValidations;

export type User = z.infer<typeof user>;
export type Teacher = z.infer<typeof teacher>;
export type Topic = z.infer<typeof topic>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const teachersInitializerProps: CollectionInitializerProps<Teacher> = {
  collectionName: 'teachers',
  documentSchema: teacher,
  indexSpecs: [
    { key: { email: 1 }, unique: true },
    { key: { userID: 1 }, unique: true },
  ],
};

const topicsInitializerProps: CollectionInitializerProps<Topic> = {
  collectionName: 'topics',
  documentSchema: topic,
  indexSpecs: [
    { key: { email: 1 }, unique: true },
    { key: { userID: 1 }, unique: true },
  ],
};

export let usersCollection: SafeCollection<User>;
export let teachersCollection: SafeCollection<Teacher>;
export let topicsCollection: SafeCollection<Topic>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    teachersCollection = await collectionInitializer(teachersInitializerProps);
    topicsCollection = await collectionInitializer(topicsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await teachersCollection.deleteMany({});
    await topicsCollection.deleteMany({});
  });
};
