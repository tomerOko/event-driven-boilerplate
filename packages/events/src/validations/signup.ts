import * as z from 'zod';
import { signupEventsNames } from '../names';

const userValidation = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
export const userCreatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_CREATED),
  data: userValidation,
});

export const userUpdatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_UPDATED),
  data: userValidation.partial(),
});
