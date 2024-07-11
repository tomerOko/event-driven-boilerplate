import {
  RabbitPubliserParams,
  RabbitSubscriberParams,
  connectRabbitMQ,
  functionWrapper,
  initiateRabbitSubsciber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';

import { handleUserEvent } from '../logic/consumers';
import { User, userValidation } from '../logic/validations';

import { ENVs } from './ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

const userSubsciberParams: RabbitSubscriberParams<User> = {
  thisServiceName: 'SIGNUP_SERVICE',
  eventType: 'NEW_USER',
  eventSchema: userValidation,
  handler: handleUserEvent,
};

export let newUserPublisher: (user: User) => void;

const userPublisherParams: RabbitPubliserParams<User> = {
  eventType: 'NEW_USER',
  eventSchema: userValidation,
};

export const initiateRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
    await initiateRabbitSubsciber(userSubsciberParams);
    newUserPublisher = await rabbitPublisherFactory(userPublisherParams);
  });
};
