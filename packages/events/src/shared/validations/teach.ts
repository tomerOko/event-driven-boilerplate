import z from 'zod';
import { countries, Country, Gender, genders, Language, languages } from '../dictionaries';

export const teacherValidationPropsMinimal = {
  age: z.number(),
  gender: z
    .string()
    .refine((value) => value in genders)
    .transform((value) => value as Gender),
  languages: z.array(
    z
      .string()
      .refine((value) => value in languages)
      .transform((value) => value as Language),
  ),
  country: z
    .string()
    .refine((value) => value in countries)
    .transform((value) => value as Country),
  profilePictureUrl: z.string().url(),
  aboutMe: z.string(),
};

export const teacherValidationProps = {
  ID: z.string(),
  userID: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  isActive: z.boolean(),
  ...teacherValidationPropsMinimal,
};

export const topicValidationPropsMinimal = {
  name: z.string(),
  description: z.string(),
  iconUrl: z.string().url(),
  minimalDurationMinutes: z.number(),
  hourlyRate: z.number(),
};

export const topicValidationProps = {
  ID: z.string(),
  teacherID: z.string(),
  userID: z.string(),
  isActive: z.boolean(),
  ...topicValidationPropsMinimal,
};
