import z from 'zod';

import { IDValidation } from '../npm';

export const paymentValidation = z.object({
  _id: IDValidation.optional(),
  holderName: z.string(),
  cardNumber: z.string(),
  expirationDate: z.string(),
  cvv: z.string(),
});

export type Payment = z.infer<typeof paymentValidation>;
