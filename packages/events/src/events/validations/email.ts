import * as z from 'zod';
import { emailEventsNames } from '../names';

export const sendEmailEventValidation = z.object({
  type: z.literal(emailEventsNames.SEND_EMAIL),
  data: z.object({
    email: z.string().email(),
    subject: z.string(),
    content: z.string(),
  }),
});
