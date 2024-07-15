import * as z from 'zod';
import {
  beTeacherDeleteRequestValidation,
  beTeacherPostRequestValidation,
  beTeacherPutRequestValidation,
} from '../validation/beTeacher';

export type BeTeacherPostRequest = z.infer<typeof beTeacherPostRequestValidation>;
export type BeTeacherPutRequest = z.infer<typeof beTeacherPutRequestValidation>;
export type BeTeacherDeleteRequest = z.infer<typeof beTeacherDeleteRequestValidation>;
