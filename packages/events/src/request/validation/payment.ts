import { z } from 'zod';
import { withdrawMethodValidationPropsMinimal, paymentMethodValidationPropsMinimal } from '../../shared/validations/payment';

export const addPaymentMethodRequestValidation = z.object({
  body: z.object(paymentMethodValidationPropsMinimal),
});

export const addPaymentMethodResponseValidation = z.object({
  paymentMethodID: z.string(),
});

export const updatePaymentMethodRequestValidation = z.object({
  body: z.object({
    paymentMethodID: z.string(),
    paymentMethod: z.object(paymentMethodValidationPropsMinimal).partial(),
  }),
});

export const updatePaymentMethodResponseValidation = z.object({});

export const deletePaymentMethodRequestValidation = z.object({
  body: z.object({
    paymentMethodID: z.string(),
  }),
});

export const deletePaymentMethodResponseValidation = z.object({});

export const addWithdrawMethodRequestValidation = z.object({
  body: z.object(withdrawMethodValidationPropsMinimal),
});

export const getPaymentMethodsRequestValidation = z.object({});

export const getPaymentMethodsResponseValidation = z.object({
  withdrawMethods: z.array(z.object({ ...paymentMethodValidationPropsMinimal, ID: z.string() })),
});

export const addWithdrawMethodResponseValidation = z.object({
  bankAccountID: z.string(),
});

export const updateWithdrawMethodRequestValidation = z.object({
  body: z.object({
    bankAccountID: z.string(),
    bankAccount: z.object(withdrawMethodValidationPropsMinimal).partial(),
  }),
});

export const updateWithdrawMethodResponseValidation = z.object({});

export const deleteWithdrawMethodRequestValidation = z.object({
  body: z.object({
    bankAccountID: z.string(),
  }),
});

export const deleteWithdrawMethodResponseValidation = z.object({});

export const getWithdrawMethodsRequestValidation = z.object({});

export const getWithdrawMethodsResponseValidation = z.object({
  withdrawMethods: z.array(z.object({ ...withdrawMethodValidationPropsMinimal, ID: z.string() })),
});
