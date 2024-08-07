import { nodeEnvironments } from 'common-lib-tomeroko3';
import { config } from 'dotenv';
import e from 'express';

import { envsValidation } from './ENVsValidation';
import { envsMock } from './envMock';

let unsafeENVs: Record<string, string | undefined>;
if ([nodeEnvironments.EXTERANL_DEV, nodeEnvironments.EXTERNAL_TEST].includes(process.env.NODE_ENV as any)) {
  config({ path: './external_development.env' });
  unsafeENVs = process.env;
} else {
  // TODO: use real envs (in k8s the way to set envs is through config maps and secrets, in local development we can use .env files) so enyway we will use process.env eventually, but we will only load .env files in the external dev environment
  unsafeENVs = envsMock;
}

const validatedENVs = envsValidation(unsafeENVs);

export const ENVs = {
  env: validatedENVs.NODE_ENV || nodeEnvironments.DEV,
  port: validatedENVs.PORT || 3000,
  rabbit: {
    host: validatedENVs.RABBITMQ_HOST,
    port: validatedENVs.RABBITMQ_PORT,
    username: validatedENVs.RABBITMQ_USERNAME,
    password: validatedENVs.RABBITMQ_PASSWORD,
  },
  jwtSecret: validatedENVs.JWT_SECRET,
  stringEncryptionSecret: validatedENVs,
  email: {
    address: validatedENVs.EMAIL_ADDRESS,
    password: validatedENVs.EMAIL_PASSWORD,
  },
};
