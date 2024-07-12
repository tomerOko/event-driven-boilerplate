import { IDValidation } from 'common-lib-tomeroko3';
import z from 'zod';

export const paymentValidation = z.object({
  _id: IDValidation.optional(),
  holderEmail: z.string(),
  holderName: z.string(),
  cardNumber: z.string(),
  expirationDate: z.string(),
  cvv: z.string(),
});

export type Payment = z.infer<typeof paymentValidation>;

export const userValidation = z.object({
  email: z.string(),
  firstName: z.string(),
});

export type User = z.infer<typeof userValidation>;

export const createPaymen = z.object({
  body: paymentValidation,
});

export type CreatePaymentPayload = z.infer<typeof createPaymen>['body'];

export const updatePaymentValidation = z.object({
  body: z.object({
    _id: IDValidation,
    update: paymentValidation.partial(),
  }),
});

export type UpdatePaymentPayload = z.infer<typeof updatePaymentValidation>['body'];

export const deletePaymentValidation = z.object({
  params: z.object({
    _id: IDValidation,
  }),
});

export type DeletePaymentPayload = z.infer<typeof deletePaymentValidation>['params'];

export const getPaymentByIdValidation = z.object({
  params: z.object({
    _id: IDValidation,
  }),
});

export type GetPaymentByIdPayload = z.infer<typeof getPaymentByIdValidation>['params'];
