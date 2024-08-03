import { functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import { RabbitPublisherParams } from 'common-lib-tomeroko3';
import {
  SendEmailEventType,
  UserCreatedEventType,
  emailEventsNames,
  sendEmailEventValidation,
  signupEventsNames,
  userCreatedEventValidation,
} from 'events-tomeroko3';

export let newUserPublisher: (user: UserCreatedEventType['data']) => void;
export let emailPublisher: (email: SendEmailEventType['data']) => void;

const userPublisherParams: RabbitPublisherParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
};

const emailPublisherParams: RabbitPublisherParams<SendEmailEventType> = {
  eventName: emailEventsNames.SEND_EMAIL,
  eventSchema: sendEmailEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    newUserPublisher = await rabbitPublisherFactory(userPublisherParams);
    emailPublisher = await rabbitPublisherFactory(emailPublisherParams);
  });
};
