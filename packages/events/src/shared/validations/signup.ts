import z from 'zod';
export const userValidationProps = {
  ID: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
};
