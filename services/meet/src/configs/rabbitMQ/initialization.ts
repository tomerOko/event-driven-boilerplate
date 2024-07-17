import { RabbitPublisherParams, functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import {
  MeetEndedEventType,
  MeetStartedEventType,
  TeacherCreatedEventType,
  TeacherDeletedEventType,
  TeacherUpdatedEventType,
  meetEndedEventValidation,
  meetEventsNames,
  meetStartedEventValidation,
  teachEventsNames,
  teacherCreatedEventValidation,
  teacherDeleteEventValidation,
  teacherUpdateEventValidation,
} from 'events-tomeroko3';

export let meetStartedPublisher: (teacher: MeetStartedEventType['data']) => void;

const meetStartedPublisherParams: RabbitPublisherParams<MeetStartedEventType> = {
  eventName: meetEventsNames.MEETING_STARTED,
  eventSchema: meetStartedEventValidation,
};

export let meetEndedPublisher: (teacher: MeetEndedEventType['data']) => void;

const meetEndedPublisherParams: RabbitPublisherParams<MeetEndedEventType> = {
  eventName: meetEventsNames.MEETING_ENDED,
  eventSchema: meetEndedEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    meetStartedPublisher = await rabbitPublisherFactory(meetStartedPublisherParams);
    meetEndedPublisher = await rabbitPublisherFactory(meetEndedPublisherParams);
  });
};
