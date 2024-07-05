import z from 'zod';
import { ObjectId } from 'mongodb';

const isString = (value: unknown): value is string => typeof value === 'string';

export const IDValidation = z
    .union([z.string(), z.instanceof(ObjectId)])
    .refine((value) => ObjectId.isValid(value))
    .transform((value) => isString(value) ? new ObjectId(value) : value );
