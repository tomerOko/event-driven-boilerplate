import { connectRabbitMQ, functionWrapper } from '@src/testy/src/index';

import { ENVs } from '../ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export const connectToRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
  });
};
