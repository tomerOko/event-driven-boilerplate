import { RabbitSubscriberParams, functionWrapper, initializeRabbitSubscriber } from 'common-lib-tomeroko3';
import { SendEmailEventType, emailEventsNames, sendEmailEventValidation } from 'events-tomeroko3';

import { handleSendEmailEvent } from '../../logic/consumers';

const sendEmailSubscriberParams: RabbitSubscriberParams<SendEmailEventType> = {
  thisServiceName: 'EMAILS_SERVICE',
  eventName: emailEventsNames.SEND_EMAIL,
  eventSchema: sendEmailEventValidation,
  handler: handleSendEmailEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    initializeRabbitSubscriber(sendEmailSubscriberParams);
  });
};
