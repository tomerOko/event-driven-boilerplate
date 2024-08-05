import z from 'zod';

export const userValidationWithoutPasswordProps = {
  ID: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
};
export const userValidationProps = {
  ...userValidationWithoutPasswordProps,
  password: z.string(),
};
