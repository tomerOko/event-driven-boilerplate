import { connectRabbitMQ, functionWrapper } from 'common-lib-tomeroko3';

import { ENVs } from '../ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export const connectToRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
  });
};
