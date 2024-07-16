import { connectToMongo } from './connection';
import { initiateCollections } from './initialization';

export { Teacher, User, teachersCollection, usersCollection } from './initialization';

export const setupMongo = async () => {
  await connectToMongo();
  await initiateCollections();
};
