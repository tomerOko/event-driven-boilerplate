import * as z from 'zod';
import { teacherValidationProps } from '../../shared/validations/teach';
import { teachEventsNames } from '../names';

export const teacherCreatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_CREATED),
  data: z.object(teacherValidationProps),
});

export const teacherUpdateEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_UPDATED),
  data: z.object(teacherValidationProps).partial(),
});

export const teacherDeleteEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_DELETED),
  data: z.object({
    teacherEmail: z.string(),
  }),
});
