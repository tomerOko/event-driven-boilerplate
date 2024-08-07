import * as z from 'zod';
import { teacherValidationProps, topicValidationProps } from '../../shared/validations/teach';
import { teachEventsNames } from '../names';

export const teacherCreatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_CREATED),
  data: z.object(teacherValidationProps),
});

export const teacherUpdateEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_UPDATED),
  data: z.object(teacherValidationProps),
});

export const teacherDeactivatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_DEACTIVATED),
  data: z.object({
    teacherID: z.string(),
  }),
});

export const topicCreatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TOPIC_CREATED),
  data: z.object(topicValidationProps),
});

export const topicUpdateEventValidation = z.object({
  type: z.literal(teachEventsNames.TOPIC_UPDATED),
  data: z.object(topicValidationProps),
});

export const topicDeleteEventValidation = z.object({
  type: z.literal(teachEventsNames.TOPIC_DELETED),
  data: z.object({
    topicID: z.string(),
  }),
});
