import exp from 'constants';
import { z } from 'zod';
import { Language, languages, teacherValidationProps, topicValidationPropsWithoutID } from '../../shared';

export const searchRequestValidation = z.object({
  body: z.object({
    topicLine: z.string(),
  }),
});

export const searchResponseValidation = z.object({
  body: z.object({
    searchResults: z.array(
      z.object({
        topic: z.object(topicValidationPropsWithoutID),
        tacher: z.object(teacherValidationProps),
      }),
    ),
  }),
});

export const searchWithFiltersRequestValidation = z.object({
  body: z.object({
    topicLine: z.string(),
    filters: z.object({
      maxPrice: z.number().int().positive(),
      minPrice: z.number().int().positive(),
      minRating: z.number().int().positive(),
      country: teacherValidationProps.country,
      language: z
        .string()
        .refine((value) => value in languages)
        .transform((value) => value as Language),
    }),
  }),
});

export const searchWithFiltersResponseValidation = searchResponseValidation;