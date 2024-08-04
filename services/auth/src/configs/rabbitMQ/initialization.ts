import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  UserCreatedEventType,
  UserLoggedInEventType,
  UserUpdatedEventType,
  signupEventsNames,
  userCreatedEventValidation,
  userLoggedInEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

import { handleNewUserEvent, handleUpdatedUserEvent } from '../../logic/consumers';

export let userLoginPublisher: (user: UserLoggedInEventType['data']) => void;

const userLoginPublisherParams: RabbitPublisherParams<UserLoggedInEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userLoggedInEventValidation,
};

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleNewUserEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
  handler: handleUpdatedUserEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    userLoginPublisher = await rabbitPublisherFactory(userLoginPublisherParams);
    initializeRabbitSubscriber(userCreatedSubscriberParams);
    initializeRabbitSubscriber(userUpdatedSubscriberParams);
  });
};
