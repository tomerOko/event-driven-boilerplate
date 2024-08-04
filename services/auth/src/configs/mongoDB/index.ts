import { connectToMongo } from './connection';
import { initializeCollections } from './initialization';

export const setupMongo = async () => {
  await connectToMongo();
  await initializeCollections();
};
