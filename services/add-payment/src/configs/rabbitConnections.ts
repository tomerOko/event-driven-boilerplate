import * as amqp from 'amqplib/callback_api';
import {
  RabbitPubliserParams,
  RabbitSubscriberParams,
  connectRabbitMQ,
  functionWrapper,
  initiateRabbitSubsciber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import 'events-tomeroko3';
import { UserCreatedEventType, signupEventsNames, userCreatedEventValidation } from 'events-tomeroko3';

import { handleUserEvent } from '../logic/consumers';

import { ENVs } from './ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export let channel: amqp.Channel;

const userSubsciberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'ADD_PAYMENT_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserEvent,
};

export const initiateRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
    await initiateRabbitSubsciber(userSubsciberParams);
  });
};
