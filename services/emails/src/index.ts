import { initializeCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';

import { setupRabbitMQ } from './configs/rabbitMQ';

const start = async () => {
  console.log('Starting server...');

  initializeCommonUtils(process.env.NODE_ENV == nodeEnvironments.PROD, 'emails');

  await setupRabbitMQ();
};

start();
