import { z } from 'zod';

export const authDbValidations = {
  user: z.object({
    ID: z.string(),
    email: z.string(),
    password: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
  }),
};
