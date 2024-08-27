import { z } from 'zod';
import {
  messageValidationProps,
  chatValidationProps,
  groupValidationProps,
  chatUserValidationProps,
} from '../shared/validations/chat';

export const chatDbValidations = {
  user: z.object(chatUserValidationProps),
  message: z.object(messageValidationProps),
  chat: z.object(chatValidationProps),
  group: z.object(groupValidationProps),
};
