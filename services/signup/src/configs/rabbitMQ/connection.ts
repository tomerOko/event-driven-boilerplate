import { connectRabbitMQ, functionWrapper } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

import { ENVs } from '../ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export const connectToRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
  });
};
