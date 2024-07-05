import { ObjectId } from 'mongodb';
import z from 'zod';

export const IDValidation = z
  .union([z.string(), z.instanceof(ObjectId)])
  .refine((value) => ObjectId.isValid(value))
  .transform((value) => new ObjectId(value) as ObjectId);

export const paymentValidation = z.object({
  _id: IDValidation.optional(),
  holderName: z.string(),
  cardNumber: z.string(),
  expirationDate: z.string(),
  cvv: z.string(),
});

type Payment = z.infer<typeof paymentValidation>;
