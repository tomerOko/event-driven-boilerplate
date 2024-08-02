import { z } from 'zod';
import { userValidationProps } from '../shared';
export const signupDbValidations = {
  user: z.object({
    ID: z.string(),
    ...userValidationProps,
  }),
  pincode: z.object({
    ID: z.string(),
    userEmail: z.string(),
    pincode: z.string(),
  }),
};
