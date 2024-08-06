import 'tsconfig-paths/register';

import { initializeCommonUtils, nodeEnvironments } from '@src/testy/src/index';

import { ENVs } from './configs/ENVs';
import { setupMongo } from './configs/mongoDB';
import { setupRabbitMQ } from './configs/rabbitMQ';

import { initializeServer } from './server';

const start = async () => {
  console.log('Starting server...');

  initializeCommonUtils({
    IS_PROD: process.env.NODE_ENV == nodeEnvironments.PROD,
    JWT_SECRET: ENVs.jwtSecret,
    SERVICE_NAME: 'TEACH_SERVICE',
  });

  await setupMongo();

  await setupRabbitMQ();

  await initializeServer();
};

start();
