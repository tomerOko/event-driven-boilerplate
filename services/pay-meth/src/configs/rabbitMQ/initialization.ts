import { RabbitSubscriberParams, functionWrapper, initializeRabbitSubscriber } from 'common-lib-tomeroko3';
import { UserCreatedEventType, signupEventsNames, userCreatedEventValidation } from 'events-tomeroko3';

import { handleUserEvent } from '../../logic/consumers';

const userSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'ADD_PAYMENT_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userSubscriberParams);
  });
};
