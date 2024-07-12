import {
  RabbitPubliserParams,
  RabbitSubscriberParams,
  connectRabbitMQ,
  functionWrapper,
  initiateRabbitSubsciber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import { UserCreatedEventType, signupEventsNames, userCreatedEventValidation } from 'events-tomeroko3';

import { handleUserEvent } from '../logic/consumers';

import { ENVs } from './ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

const userSubsciberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'SIGNUP_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserEvent,
};

export let newUserPublisher: (user: UserCreatedEventType['data']) => void;

const userPublisherParams: RabbitPubliserParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
};

export const initiateRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
    await initiateRabbitSubsciber(userSubsciberParams);
    newUserPublisher = await rabbitPublisherFactory(userPublisherParams);
  });
};
