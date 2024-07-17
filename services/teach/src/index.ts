import { initializeCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';

import { setupMongo } from './configs/mongoDB';
import { setupRabbitMQ } from './configs/rabbitMQ';

import { initializeServer } from './server';

const start = async () => {
  console.log('Starting server...');

  initializeCommonUtils(process.env.NODE_ENV == nodeEnvironments.PROD, 'signup');

  await setupMongo();

  await setupRabbitMQ();

  await initializeServer();
};

start();
