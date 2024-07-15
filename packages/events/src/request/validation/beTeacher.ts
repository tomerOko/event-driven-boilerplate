import { z } from 'zod';
import { teacherValidationProps } from '../../shared/validations/beTeacher';

export const beTeacherPostRequestValidation = z.object({
  body: z.object(teacherValidationProps),
});

const teacherValidationPropsWithoutEmail = Object.fromEntries(
  Object.entries(teacherValidationProps).filter(([key]) => key !== 'email'),
);

export const beTeacherPutRequestValidation = z.object({
  body: z
    .object({
      email: z.string(),
      update: z.object(teacherValidationPropsWithoutEmail).partial(),
    })
    .partial(),
});

export const beTeacherDeleteRequestValidation = z.object({
  params: z.object({
    teacherEmail: z.string(),
  }),
});
