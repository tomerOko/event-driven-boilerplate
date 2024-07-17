import z from 'zod';
import { countries, Country, Gender, genders, Language, languages } from '../dictionaries';

export const teacherValidationProps = {
  email: z.string(),
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
