import 'source-map-support/register';

import { connectToMongo } from './configs/mongo';
import { connectRabbitMQ } from './configs/rabbitConnections';
import { initPaymentsCollection } from './logic/DAL';

import { ProcessErrorHandling, initiateLoggers, nodeEnvironments, setTransactionId } from './npm';
import { initializeServer } from './server';

const start = async () => {
  console.log('Starting server...');

  initiateLoggers(process.env.NODE_ENV == nodeEnvironments.PROD);

  setTransactionId('INITIALIZATION' + new Date().getTime().toString());

  ProcessErrorHandling.setEventListeners();

  await connectToMongo();

  await initPaymentsCollection(); //todo: find better place for this / cleaner way to do this

  await connectRabbitMQ();

  await initializeServer();
};

start();
