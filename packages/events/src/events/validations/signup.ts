import * as z from 'zod';
import { signupEventsNames } from '../names';
import { userValidationProps } from '../../shared/validations/signup';

export const userCreatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_CREATED),
  data: z.object(userValidationProps),
});

export const userUpdatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_UPDATED),
  data: z.object(userValidationProps).partial(),
});
