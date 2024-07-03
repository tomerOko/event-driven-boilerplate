import 'source-map-support/register';



import { initializeServer } from './server';
import { connectToMongo } from './configs/mongo';
import { connectRabbitMQ } from './configs/rabbitConnections';



const start = async () => {

  console.log('Starting server...');

  await connectToMongo();

  await connectRabbitMQ()

  await initializeServer();

};

start();
