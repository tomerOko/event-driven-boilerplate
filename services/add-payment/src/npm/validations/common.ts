import { ObjectId } from 'mongodb';
import z from 'zod';

import { isString } from '../utils/typeCheckers';

export const IDValidation = z
  .union([z.string(), z.instanceof(ObjectId)])
  .refine((value) => ObjectId.isValid(value))
  .transform((value) => (isString(value) ? new ObjectId(value) : value));
