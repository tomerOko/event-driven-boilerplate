import z from 'zod';

export const messageTypes = ['text', 'image', 'voice'] as const;
export type MessageType = (typeof messageTypes)[number];

export const messageValidationPropsMinimal = {
  content: z.string(),
  type: z.enum(messageTypes),
  timestamp: z.date(),
};

export const messageValidationProps = {
  ID: z.string(),
  senderId: z.string(),
  chatId: z.string(),
  ...messageValidationPropsMinimal,
};

export const chatValidationPropsMinimal = {
  name: z.string().optional(), // Optional for direct chats
  isGroup: z.boolean(),
  lastMessageAt: z.date(),
};

export const chatValidationProps = {
  ID: z.string(),
  participants: z.array(z.string()),
  createdAt: z.date(),
  ...chatValidationPropsMinimal,
};

export const groupValidationPropsMinimal = {
  name: z.string(),
  description: z.string().optional(),
  avatarUrl: z.string().url().optional(),
};

export const groupValidationProps = {
  ID: z.string(),
  adminId: z.string(),
  participants: z.array(z.string()),
  createdAt: z.date(),
  ...groupValidationPropsMinimal,
};

export const userValidationPropsMinimal = {
  username: z.string(),
  avatarUrl: z.string().url().optional(),
  status: z.enum(['online', 'offline', 'away']),
  lastSeen: z.date(),
};

export const chatUserValidationProps = {
  ID: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  ...userValidationPropsMinimal,
};
