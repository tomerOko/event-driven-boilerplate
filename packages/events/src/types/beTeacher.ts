import * as z from 'zod';
import { teacherCreatedEventValidation, teacherUpdateEventValidation } from '../validations/beTeacher';

export type TeacherCreatedEventType = z.infer<typeof teacherCreatedEventValidation>;
export type TeacherUpdatedEventType = z.infer<typeof teacherUpdateEventValidation>;
