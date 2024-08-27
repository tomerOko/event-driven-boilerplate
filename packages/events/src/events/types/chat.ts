import * as z from 'zod';
import {
  messageSentEventValidation,
  chatCreatedEventValidation,
  chatUpdatedEventValidation,
  groupCreatedEventValidation,
  groupUpdatedEventValidation,
  userJoinedGroupEventValidation,
  userLeftGroupEventValidation,
  messageReadEventValidation,
  userStatusChangedEventValidation,
} from '../validations/chat';

export type MessageSentEventType = z.infer<typeof messageSentEventValidation>;
export type ChatCreatedEventType = z.infer<typeof chatCreatedEventValidation>;
export type ChatUpdatedEventType = z.infer<typeof chatUpdatedEventValidation>;
export type GroupCreatedEventType = z.infer<typeof groupCreatedEventValidation>;
export type GroupUpdatedEventType = z.infer<typeof groupUpdatedEventValidation>;
export type UserJoinedGroupEventType = z.infer<typeof userJoinedGroupEventValidation>;
export type UserLeftGroupEventType = z.infer<typeof userLeftGroupEventValidation>;
export type MessageReadEventType = z.infer<typeof messageReadEventValidation>;
export type UserStatusChangedEventType = z.infer<typeof userStatusChangedEventValidation>;
