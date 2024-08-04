import * as z from 'zod';
import { authEventsNames } from '../names';

export const userLoggedInEventValidation = z.object({
  type: z.literal(authEventsNames.USER_LOGGED_IN),
  data: z.object({
    email: z.string(),
    ID: z.string(),
  }),
});
