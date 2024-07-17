import { functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import { RabbitPubliserParams } from 'common-lib-tomeroko3';
import { UserCreatedEventType, signupEventsNames, userCreatedEventValidation } from 'events-tomeroko3';

export let newUserPublisher: (user: UserCreatedEventType['data']) => void;

const userPublisherParams: RabbitPubliserParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    newUserPublisher = await rabbitPublisherFactory(userPublisherParams);
  });
};
