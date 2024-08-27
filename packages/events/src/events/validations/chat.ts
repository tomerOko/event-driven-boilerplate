import * as z from 'zod';
import { messageValidationProps, chatValidationProps, groupValidationProps } from '../../shared/validations/chat';
import { chatEventsNames } from '../names';

export const messageSentEventValidation = z.object({
  type: z.literal(chatEventsNames.MESSAGE_SENT),
  data: z.object(messageValidationProps),
});

export const chatCreatedEventValidation = z.object({
  type: z.literal(chatEventsNames.CHAT_CREATED),
  data: z.object(chatValidationProps),
});

export const chatUpdatedEventValidation = z.object({
  type: z.literal(chatEventsNames.CHAT_UPDATED),
  data: z.object(chatValidationProps),
});

export const groupCreatedEventValidation = z.object({
  type: z.literal(chatEventsNames.GROUP_CREATED),
  data: z.object(groupValidationProps),
});

export const groupUpdatedEventValidation = z.object({
  type: z.literal(chatEventsNames.GROUP_UPDATED),
  data: z.object(groupValidationProps),
});

export const userJoinedGroupEventValidation = z.object({
  type: z.literal(chatEventsNames.USER_JOINED_GROUP),
  data: z.object({
    groupId: z.string(),
    userId: z.string(),
  }),
});

export const userLeftGroupEventValidation = z.object({
  type: z.literal(chatEventsNames.USER_LEFT_GROUP),
  data: z.object({
    groupId: z.string(),
    userId: z.string(),
  }),
});

export const messageReadEventValidation = z.object({
  type: z.literal(chatEventsNames.MESSAGE_READ),
  data: z.object({
    messageId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
  }),
});

export const userStatusChangedEventValidation = z.object({
  type: z.literal(chatEventsNames.USER_STATUS_CHANGED),
  data: z.object({
    userId: z.string(),
    status: z.enum(['online', 'offline', 'away']),
    timestamp: z.date(),
  }),
});
