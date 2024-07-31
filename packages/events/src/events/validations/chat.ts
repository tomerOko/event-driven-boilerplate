import * as z from 'zod';
import { chatValidationProps } from '../../shared/validations';
import { chatEventsNames } from '../names';

export const messageSentEventValidation = z.object({
  type: z.literal(chatEventsNames.USER_SENT_NEW_MESSAGE),
  data: z.object(chatValidationProps),
});

export const messageUpdatedEventValidation = z.object({
  type: z.literal(chatEventsNames.USER_UPDATED_MESSAGE),
  data: z.object(chatValidationProps),
});

export const messageReceivedEventValidation = z.object({
  type: z.literal(chatEventsNames.USER_RECEIVED_MESSAGE),
  data: z.object(chatValidationProps),
});
