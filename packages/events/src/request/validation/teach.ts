import { z } from 'zod';
import { teacherValidationProps } from '../../shared/validations/teach';

export const teachPostRequestValidation = z.object({
  body: z.object(teacherValidationProps),
});

const teacherValidationPropsWithoutEmail = Object.fromEntries(
  Object.entries(teacherValidationProps).filter(([key]) => key !== 'email'),
);

export const teachPutRequestValidation = z.object({
  body: z.object({
    email: z.string(),
    update: z.object(teacherValidationPropsWithoutEmail).partial(),
  }),
});

export const teachDeleteRequestValidation = z.object({
  params: z.object({
    teacherEmail: z.string(),
  }),
});
