import * as z from 'zod';
import { countries, Country } from '../dictionaries/countries';
import { Gender, genders } from '../dictionaries/genders';
import { languages } from '../dictionaries/languages';
import { beTeacherEventsNames } from '../names';

const teacherDetailsValidation = z.object({
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
      .transform((value) => value as keyof typeof languages),
  ),
  country: z
    .string()
    .refine((value) => value in countries)
    .transform((value) => value as Country),
});

export const teacherCreatedEventValidation = z.object({
  type: z.literal(beTeacherEventsNames.TEACHER_CREATED),
  data: teacherDetailsValidation,
});

export const teacherUpdateEventValidation = z.object({
  type: z.literal(beTeacherEventsNames.TEACHER_UPDATED),
  data: teacherDetailsValidation.partial(),
});
