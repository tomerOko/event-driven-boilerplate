import { initiateCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';

import { connectToMongo } from './configs/mongo';
import { initiateRabbitMq } from './configs/rabbitConnections';
import { initCollections } from './logic/DAL';

import { initializeServer } from './server';
import { initiateSocket } from './socket';

const start = async () => {
  console.log('Starting server...');

  initiateCommonUtils(process.env.NODE_ENV == nodeEnvironments.PROD, 'signup');

  await connectToMongo();

  await initCollections();

  await initiateRabbitMq();

  await initializeServer();

  initiateSocket();
};

start();
