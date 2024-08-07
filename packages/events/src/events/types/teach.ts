import * as z from 'zod';
import {
  teacherCreatedEventValidation,
  teacherDeactivatedEventValidation,
  teacherUpdateEventValidation,
  topicCreatedEventValidation,
  topicDeleteEventValidation,
  topicUpdateEventValidation,
} from '../validations/teach';

export type TeacherCreatedEventType = z.infer<typeof teacherCreatedEventValidation>;
export type TeacherUpdatedEventType = z.infer<typeof teacherUpdateEventValidation>;
export type TeacherDeactivatedEventType = z.infer<typeof teacherDeactivatedEventValidation>;
export type TopicCreatedEventType = z.infer<typeof topicCreatedEventValidation>;
export type TopicUpdatedEventType = z.infer<typeof topicUpdateEventValidation>;
export type TopicDeletedEventType = z.infer<typeof topicDeleteEventValidation>;
