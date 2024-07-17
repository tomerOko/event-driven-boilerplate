import * as z from 'zod';
import { teachDeleteRequestValidation, teachPostRequestValidation, teachPutRequestValidation } from '../validation/teach';

export type TeachPostRequest = z.infer<typeof teachPostRequestValidation>;
export type TeachPutRequest = z.infer<typeof teachPutRequestValidation>;
export type TeachDeleteRequest = z.infer<typeof teachDeleteRequestValidation>;
