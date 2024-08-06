import { z } from 'zod';
import { userValidationProps, userValidationWithoutPasswordProps } from '../../shared';

export const loginMethods = {
  PASSWORD: 'PASSWORD',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  AUTHENTICATOR: 'AUTHENTICATOR',
  APPLE: 'APPLE',
} as const;

export type LoginMethod = keyof typeof loginMethods;

export const loginRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    loginMethod: z
      .string()
      .refine((value) => Object.keys(loginMethods).includes(value))
      .transform((value) => value as LoginMethod),
    methodSecret: z.string().describe('the secret for the login method, like the password or the OAuth token'),
  }),
});

export const loginRespondValidation = z.object({
  token: z.string(),
  user: z.object(userValidationWithoutPasswordProps),
});
