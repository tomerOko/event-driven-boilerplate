import * as z from 'zod';
import {
  sendMessageRequestValidation,
  sendMessageResponseValidation,
  createGroupRequestValidation,
  createGroupResponseValidation,
  joinGroupRequestValidation,
  joinGroupResponseValidation,
  leaveGroupRequestValidation,
  leaveGroupResponseValidation,
  getRecentChatsRequestValidation,
  getRecentChatsResponseValidation,
  getMessagesRequestValidation,
  getMessagesResponseValidation,
  searchMessagesRequestValidation,
  searchMessagesResponseValidation,
} from '../validation/chat';

export type sendMessageRequestType = z.infer<typeof sendMessageRequestValidation>;
export type sendMessageResponseType = z.infer<typeof sendMessageResponseValidation>;

export type createGroupRequestType = z.infer<typeof createGroupRequestValidation>;
export type createGroupResponseType = z.infer<typeof createGroupResponseValidation>;

export type joinGroupRequestType = z.infer<typeof joinGroupRequestValidation>;
export type joinGroupResponseType = z.infer<typeof joinGroupResponseValidation>;

export type leaveGroupRequestType = z.infer<typeof leaveGroupRequestValidation>;
export type leaveGroupResponseType = z.infer<typeof leaveGroupResponseValidation>;

export type getRecentChatsRequestType = z.infer<typeof getRecentChatsRequestValidation>;
export type getRecentChatsResponseType = z.infer<typeof getRecentChatsResponseValidation>;

export type getMessagesRequestType = z.infer<typeof getMessagesRequestValidation>;
export type getMessagesResponseType = z.infer<typeof getMessagesResponseValidation>;

export type searchMessagesRequestType = z.infer<typeof searchMessagesRequestValidation>;
export type searchMessagesResponseType = z.infer<typeof searchMessagesResponseValidation>;
