import { functionWrapper, rabbitPublisherFactory } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';
import { RabbitPublisherParams } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

import { UserCreatedEventType, signupEventsNames, userCreatedEventValidation } from 'events-tomeroko3';

export let newUserPublisher: (user: UserCreatedEventType['data']) => void;

const userPublisherParams: RabbitPublisherParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    newUserPublisher = await rabbitPublisherFactory(userPublisherParams);
  });
};
