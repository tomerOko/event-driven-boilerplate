import { ProcessErrorHandling, initiateLoggers, nativeLogger, setTransactionId } from 'common-lib-tomeroko3';
import 'source-map-support/register';

import { connectToMongo } from './configs/mongo';
import { connectRabbitMQ } from './configs/rabbitConnections';
import { initPaymentsCollection } from './logic/DAL';

import { initializeServer } from './server';

const start = async () => {
  console.log('Starting server...');

  initiateLoggers(process.env.NODE_ENV! == 'production');

  setTransactionId('INITIALIZATION' + new Date().getTime().toString());

  ProcessErrorHandling.setEventListeners(nativeLogger);

  await connectToMongo();

  await initPaymentsCollection(); //todo: find better place for this / cleaner way to do this

  await connectRabbitMQ();

  await initializeServer();
};

start();
