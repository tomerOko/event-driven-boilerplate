import { config } from 'dotenv';

import { nodeEnvironments } from '../npm';

import { envsValidation } from './ENVsValidation';
import { envsMock } from './envMock';

let unsafeENVs: Record<string, string | undefined>;
if (process.env.NODE_ENV === nodeEnvironments.EXTERANL_DEV) {
  config();
  unsafeENVs = process.env;
} else {
  // TODO: use real envs (in k8s the way to set envs is through config maps and secrets, in local development we can use .env files) so enyway we will use process.env eventually, but we will only load .env files in the external dev environment
  unsafeENVs = envsMock;
}

const validatedENVs = envsValidation(envsMock);

export const ENVs = {
  env: validatedENVs.NODE_ENV || nodeEnvironments.DEV,
  port: validatedENVs.PORT || 3000,
  mongo: {
    host: validatedENVs.MONGO_HOST,
    port: validatedENVs.MONGO_PORT,
    dbName: validatedENVs.MONGO_DB_NAME,
  },
  rabbit: {
    host: validatedENVs.RABBITMQ_HOST,
    port: validatedENVs.RABBITMQ_PORT,
    username: validatedENVs.RABBITMQ_USERNAME,
    password: validatedENVs.RABBITMQ_PASSWORD,
  },
  jwtSecret: validatedENVs.JWT_SECRET,
  stringEncryptionSecret: validatedENVs,
};
