import { RabbitPublisherParams, connectRabbitMQ, functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import {
  TeacherCreatedEventType,
  TeacherUpdatedEventType,
  beTeacherEventsNames,
  teacherCreatedEventValidation,
  teacherUpdateEventValidation,
} from 'events-tomeroko3';

import { ENVs } from './ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export let newTeacherPublisher: (teacher: TeacherCreatedEventType['data']) => void;

const newTeacherPublisherParams: RabbitPublisherParams<TeacherCreatedEventType> = {
  eventName: beTeacherEventsNames.TEACHER_CREATED,
  eventSchema: teacherCreatedEventValidation,
};

export let updateTeacherPublisher: (teacher: TeacherUpdatedEventType['data']) => void;

const lteacherPublisherParams: RabbitPublisherParams<TeacherUpdatedEventType> = {
  eventName: beTeacherEventsNames.TEACHER_UPDATED,
  eventSchema: teacherUpdateEventValidation,
};

export const initiateRabbitMq = async (): Promise<void> => {
  return functionWrapper(async () => {
    await connectRabbitMQ(connectionString);
    newTeacherPublisher = await rabbitPublisherFactory(newTeacherPublisherParams);
  });
};
