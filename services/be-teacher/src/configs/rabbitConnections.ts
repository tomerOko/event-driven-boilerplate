import { RabbitPubliserParams, connectRabbitMQ, functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import { UserCreatedEventType, signupEventsNames, userCreatedEventValidation } from 'events-tomeroko3';

import { ENVs } from './ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export let newUserPublisher: (user: UserCreatedEventType['data']) => void;

const userPublisherParams: RabbitPubliserParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
};

export const initiateRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
    newUserPublisher = await rabbitPublisherFactory(userPublisherParams);
  });
};
