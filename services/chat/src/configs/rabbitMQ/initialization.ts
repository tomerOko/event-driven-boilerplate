import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  MessageSentEventType,
  GroupCreatedEventType,
  UserJoinedGroupEventType,
  UserLeftGroupEventType,
  UserCreatedEventType,
  chatEventsNames,
  signupEventsNames,
  messageSentEventValidation,
  groupCreatedEventValidation,
  userJoinedGroupEventValidation,
  userLeftGroupEventValidation,
  userCreatedEventValidation,
} from 'events-tomeroko3';

import { handleUserEvent, handleMessageSent } from '../logic/consumers';

export let messageSentPublisher: (message: MessageSentEventType['data']) => void;
export let groupCreatedPublisher: (group: GroupCreatedEventType['data']) => void;
export let userJoinedGroupPublisher: (data: UserJoinedGroupEventType['data']) => void;
export let userLeftGroupPublisher: (data: UserLeftGroupEventType['data']) => void;

const messageSentPublisherParams: RabbitPublisherParams<MessageSentEventType> = {
  eventName: chatEventsNames.MESSAGE_SENT,
  eventSchema: messageSentEventValidation,
};

const groupCreatedPublisherParams: RabbitPublisherParams<GroupCreatedEventType> = {
  eventName: chatEventsNames.GROUP_CREATED,
  eventSchema: groupCreatedEventValidation,
};

const userJoinedGroupPublisherParams: RabbitPublisherParams<UserJoinedGroupEventType> = {
  eventName: chatEventsNames.USER_JOINED_GROUP,
  eventSchema: userJoinedGroupEventValidation,
};

const userLeftGroupPublisherParams: RabbitPublisherParams<UserLeftGroupEventType> = {
  eventName: chatEventsNames.USER_LEFT_GROUP,
  eventSchema: userLeftGroupEventValidation,
};

const userSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'CHAT_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserEvent,
};

const messageSentSubscriberParams: RabbitSubscriberParams<MessageSentEventType> = {
  thisServiceName: 'CHAT_SERVICE',
  eventName: chatEventsNames.MESSAGE_SENT,
  eventSchema: messageSentEventValidation,
  handler: handleMessageSent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userSubscriberParams);
    await initializeRabbitSubscriber(messageSentSubscriberParams);
    messageSentPublisher = await rabbitPublisherFactory(messageSentPublisherParams);
    groupCreatedPublisher = await rabbitPublisherFactory(groupCreatedPublisherParams);
    userJoinedGroupPublisher = await rabbitPublisherFactory(userJoinedGroupPublisherParams);
    userLeftGroupPublisher = await rabbitPublisherFactory(userLeftGroupPublisherParams);
  });
};