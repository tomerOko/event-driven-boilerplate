import { initiateCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';

import { setupMongo } from './configs/mongoDB';
import { setupRabbitMQ } from './configs/rabbitMQ';

import { initializeServer } from './server';
import { initiateSocket } from './socket';

const start = async () => {
  console.log('Starting server...');

  initiateCommonUtils(process.env.NODE_ENV == nodeEnvironments.PROD, 'meet');

  await setupMongo();

  await setupRabbitMQ();

  await initializeServer();

  initiateSocket();
};

start();
