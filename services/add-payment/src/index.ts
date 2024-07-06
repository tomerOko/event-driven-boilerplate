import 'source-map-support/register';

import { connectToMongo } from './configs/mongo';
import { connectRabbitMQ } from './configs/rabbitConnections';
import { initPaymentsCollection } from './logic/DAL';

import { initializeServer } from './server';

const start = async () => {
  console.log(process.env.DEV_ENVIRONMENT);

  console.log('Starting server...');

  await connectToMongo();

  await initPaymentsCollection(); //todo: find better place for this / cleaner way to do this

  await connectRabbitMQ();

  await initializeServer();
};

start();
