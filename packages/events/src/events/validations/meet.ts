import * as z from 'zod';
import { meetValidationProps } from '../../shared/validations/meet';
import { meetEventsNames } from '../names/meet';

export const meetStartedEventValidation = z.object({
  type: z.literal(meetEventsNames.MEETING_STARTED),
  data: z.object(meetValidationProps),
});

export const meetEndedEventValidation = z.object({
  type: z.literal(meetEventsNames.MEETING_ENDED),
  data: z.object(meetValidationProps),
});
