import * as z from 'zod';
import { meetEndedEventValidation, meetStartedEventValidation } from '../validations/meet';

export type MeetStartedEventType = z.infer<typeof meetStartedEventValidation>;
export type MeetEndedEventType = z.infer<typeof meetEndedEventValidation>;
