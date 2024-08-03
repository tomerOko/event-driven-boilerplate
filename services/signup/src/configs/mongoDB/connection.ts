import { connect, functionWrapper } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

import { ENVs } from '../ENVs';

const { dbName, host, port } = ENVs.mongo;
const url = `mongodb://${host}:${port}`;

export const connectToMongo = async () => {
  return functionWrapper(async () => {
    await connect(url, dbName);
  });
};
