import { functionWrapper } from 'common-lib-tomeroko3';

import { connect } from '../../testy/mongo';
import { ENVs } from '../ENVs';

const { dbName, host, port } = ENVs.mongo;
const url = `mongodb://${host}:${port}`;

export const connectToMongo = async () => {
  return functionWrapper(async () => {
    await connect(url, dbName);
  });
};
