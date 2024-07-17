import * as z from 'zod';
import { teacherCreatedEventValidation, teacherDeleteEventValidation, teacherUpdateEventValidation } from '../validations/teach';
import exp from 'constants';

export type TeacherCreatedEventType = z.infer<typeof teacherCreatedEventValidation>;
export type TeacherUpdatedEventType = z.infer<typeof teacherUpdateEventValidation>;
export type TeacherDeletedEventType = z.infer<typeof teacherDeleteEventValidation>;
