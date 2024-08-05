import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  TeacherCreatedEventType,
  TeacherDeletedEventType,
  TeacherUpdatedEventType,
  TopicCreatedEventType,
  TopicDeletedEventType,
  TopicUpdatedEventType,
  UserCreatedEventType,
  signupEventsNames,
  teachEventsNames,
  teacherCreatedEventValidation,
  teacherDeleteEventValidation,
  teacherUpdateEventValidation,
  topicCreatedEventValidation,
  topicDeleteEventValidation,
  topicUpdateEventValidation,
  userCreatedEventValidation,
} from 'events-tomeroko3';

import { handleUserEvent } from '../../logic/consumers';

export let teacherCreatedPublisher: (teacher: TeacherCreatedEventType['data']) => void;
export let teacherDeletedPublisher: (teacher: TeacherDeletedEventType['data']) => void;
export let teacherUpdatedPublisher: (teacher: TeacherUpdatedEventType['data']) => void;
export let topicCreatedPublisher: (topic: TopicCreatedEventType['data']) => void;
export let topicDeletedPublisher: (topic: TopicDeletedEventType['data']) => void;
export let topicUpdatedPublisher: (topic: TopicUpdatedEventType['data']) => void;

const teacherCreatedPublisherParams: RabbitPublisherParams<TeacherCreatedEventType> = {
  eventName: teachEventsNames.TEACHER_CREATED,
  eventSchema: teacherCreatedEventValidation,
};

const teacherDeletedPublisherParams: RabbitPublisherParams<TeacherDeletedEventType> = {
  eventName: teachEventsNames.TEACHER_DELETED,
  eventSchema: teacherDeleteEventValidation,
};

const teacherUpdatedPublisherParams: RabbitPublisherParams<TeacherUpdatedEventType> = {
  eventName: teachEventsNames.TEACHER_UPDATED,
  eventSchema: teacherUpdateEventValidation,
};

const topicCreatedPublisherParams: RabbitPublisherParams<TopicCreatedEventType> = {
  eventName: teachEventsNames.TOPIC_CREATED,
  eventSchema: topicCreatedEventValidation,
};

const topicDeletedPublisherParams: RabbitPublisherParams<TopicDeletedEventType> = {
  eventName: teachEventsNames.TOPIC_DELETED,
  eventSchema: topicDeleteEventValidation,
};

const topicUpdatedPublisherParams: RabbitPublisherParams<TopicUpdatedEventType> = {
  eventName: teachEventsNames.TOPIC_UPDATED,
  eventSchema: topicUpdateEventValidation,
};

const userSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'TEACH_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userSubscriberParams);
    teacherCreatedPublisher = await rabbitPublisherFactory(teacherCreatedPublisherParams);
    teacherDeletedPublisher = await rabbitPublisherFactory(teacherDeletedPublisherParams);
    teacherUpdatedPublisher = await rabbitPublisherFactory(teacherUpdatedPublisherParams);
    topicCreatedPublisher = await rabbitPublisherFactory(topicCreatedPublisherParams);
    topicDeletedPublisher = await rabbitPublisherFactory(topicDeletedPublisherParams);
    topicUpdatedPublisher = await rabbitPublisherFactory(topicUpdatedPublisherParams);
  });
};
