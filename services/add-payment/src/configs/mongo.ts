import { connect } from '../npm/mongo';

import { ENVs } from './ENVs';

const { dbName, host, port } = ENVs.mongo;
const url = `mongodb://${host}:${port}`;

export const connectToMongo = async () => {
  try {
    const currentUrl = url;
    await connect(currentUrl, dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    throw error;
  }
};
