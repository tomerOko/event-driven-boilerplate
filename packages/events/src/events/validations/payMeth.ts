import * as z from 'zod';
import { teacherValidationProps } from '../../shared/validations/beTeacher';
import { beTeacherEventsNames } from '../names';

export const teacherCreatedEventValidation = z.object({
  type: z.literal(beTeacherEventsNames.TEACHER_CREATED),
  data: z.object(teacherValidationProps),
});

export const teacherUpdateEventValidation = z.object({
  type: z.literal(beTeacherEventsNames.TEACHER_UPDATED),
  data: z.object(teacherValidationProps).partial(),
});

export const teacherDeleteEventValidation = z.object({
  type: z.literal(beTeacherEventsNames.TEACHER_DELETED),
  data: z.object({
    teacherEmail: z.string(),
  }),
});
