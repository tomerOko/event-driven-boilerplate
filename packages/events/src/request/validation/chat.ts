import { z } from 'zod';
import {
  messageValidationPropsMinimal,
  chatValidationPropsMinimal,
  groupValidationPropsMinimal,
} from '../../shared/validations/chat';

export const sendMessageRequestValidation = z.object({
  body: z.object({
    chatId: z.string(),
    ...messageValidationPropsMinimal,
  }),
});

export const sendMessageResponseValidation = z.object({
  messageId: z.string(),
});

export const createGroupRequestValidation = z.object({
  body: z.object({
    ...groupValidationPropsMinimal,
    participants: z.array(z.string()),
  }),
});

export const createGroupResponseValidation = z.object({
  groupId: z.string(),
});

export const joinGroupRequestValidation = z.object({
  body: z.object({
    groupId: z.string(),
  }),
});

export const joinGroupResponseValidation = z.object({});

export const leaveGroupRequestValidation = z.object({
  body: z.object({
    groupId: z.string(),
  }),
});

export const leaveGroupResponseValidation = z.object({});

export const getRecentChatsRequestValidation = z.object({
  query: z.object({
    limit: z.number().optional(),
  }),
});

export const getRecentChatsResponseValidation = z.object({
  chats: z.array(z.object(chatValidationPropsMinimal)),
});

export const getMessagesRequestValidation = z.object({
  query: z.object({
    chatId: z.string(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }),
});

export const getMessagesResponseValidation = z.object({
  messages: z.array(z.object(messageValidationPropsMinimal)),
});

export const searchMessagesRequestValidation = z.object({
  query: z.object({
    query: z.string(),
    limit: z.number().optional(),
  }),
});

export const searchMessagesResponseValidation = z.object({
  messages: z.array(z.object(messageValidationPropsMinimal)),
});
