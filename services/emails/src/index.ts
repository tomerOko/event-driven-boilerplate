import { initializeCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';

import { ENVs } from './configs/ENVs';
import { setupRabbitMQ } from './configs/rabbitMQ';

const start = async () => {
  console.log('Starting server...');

  initializeCommonUtils({
    IS_PROD: ENVs.env == nodeEnvironments.PROD,
    JWT_SECRET: ENVs.jwtSecret,
    SERVICE_NAME: 'EMAILS_SERVICE',
  });

  await setupRabbitMQ();
};

start();
