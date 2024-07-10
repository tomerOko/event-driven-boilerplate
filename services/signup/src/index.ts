import { initiateCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';

import { connectToMongo } from './configs/mongo';
import { connectRabbitMQ } from './configs/rabbitConnections';
import { initCollections } from './logic/DAL';

import { initializeServer } from './server';

const start = async () => {
  console.log('Starting server...');

  initiateCommonUtils(process.env.NODE_ENV == nodeEnvironments.PROD, 'signup');

  await connectToMongo();

  await initCollections();

  await connectRabbitMQ();

  await initializeServer();
};

start();
