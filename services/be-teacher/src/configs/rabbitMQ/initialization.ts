import { RabbitPublisherParams, functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import {
  TeacherCreatedEventType,
  TeacherDeletedEventType,
  TeacherUpdatedEventType,
  beTeacherEventsNames,
  teacherCreatedEventValidation,
  teacherDeleteEventValidation,
  teacherUpdateEventValidation,
} from 'events-tomeroko3';

export let newTeacherPublisher: (teacher: TeacherCreatedEventType['data']) => void;

const newTeacherPublisherParams: RabbitPublisherParams<TeacherCreatedEventType> = {
  eventName: beTeacherEventsNames.TEACHER_CREATED,
  eventSchema: teacherCreatedEventValidation,
};

export let updateTeacherPublisher: (teacher: TeacherUpdatedEventType['data']) => void;

const updateTeacherPublisherParams: RabbitPublisherParams<TeacherUpdatedEventType> = {
  eventName: beTeacherEventsNames.TEACHER_UPDATED,
  eventSchema: teacherUpdateEventValidation,
};

export let deleteTeacherPublisher: (teacher: TeacherDeletedEventType['data']) => void;

const deleteTeacherPublisherParams: RabbitPublisherParams<TeacherDeletedEventType> = {
  eventName: beTeacherEventsNames.TEACHER_DELETED,
  eventSchema: teacherDeleteEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    newTeacherPublisher = await rabbitPublisherFactory(newTeacherPublisherParams);
    updateTeacherPublisher = await rabbitPublisherFactory(updateTeacherPublisherParams);
    deleteTeacherPublisher = await rabbitPublisherFactory(deleteTeacherPublisherParams);
  });
};
