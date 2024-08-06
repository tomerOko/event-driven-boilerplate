import { connect, functionWrapper } from '@src/testy/src/index';

import { ENVs } from '../ENVs';

const { dbName, host, port } = ENVs.mongo;
const url = `mongodb://${host}:${port}`;

export const connectToMongo = async () => {
  return functionWrapper(async () => {
    await connect(url, dbName);
  });
};
