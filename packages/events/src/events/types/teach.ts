import * as z from 'zod';
import {
  teacherCreatedEventValidation,
  teacherDeleteEventValidation,
  teacherUpdateEventValidation,
  topicCreatedEventValidation,
  topicDeleteEventValidation,
  topicUpdateEventValidation,
} from '../validations/teach';

export type TeacherCreatedEventType = z.infer<typeof teacherCreatedEventValidation>;
export type TeacherUpdatedEventType = z.infer<typeof teacherUpdateEventValidation>;
export type TeacherDeletedEventType = z.infer<typeof teacherDeleteEventValidation>;
export type TopicCreatedEventType = z.infer<typeof topicCreatedEventValidation>;
export type TopicUpdatedEventType = z.infer<typeof topicUpdateEventValidation>;
export type TopicDeletedEventType = z.infer<typeof topicDeleteEventValidation>;
