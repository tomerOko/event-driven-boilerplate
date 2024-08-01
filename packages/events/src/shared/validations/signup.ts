import z from 'zod';
export const userValidationProps = {
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
};
