import z from 'zod';
import { commonValidations } from 'common-lib-tomeroko3';

export const paymentValidation = z.object({
  _id: commonValidations.IDValidation.optional(),
  holderName: z.string(),
  cardNumber: z.string(),
  expirationDate: z.string(),
  cvv: z.string(),
});

export type Payment = z.infer<typeof paymentValidation>;
