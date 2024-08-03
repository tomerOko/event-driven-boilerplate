import { initializeCommonUtils, nodeEnvironments } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

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
