import { z } from 'zod';
import {
  bankAccountValidationProps,
  bankAccountValidationPropsMinimal,
  paymentMethodValidationProps,
  paymentMethodValidationPropsMinimal,
} from '../../shared/validations/payment';

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

export const addBankAccountRequestValidation = z.object({
  body: z.object(bankAccountValidationPropsMinimal),
});

export const addBankAccountResponseValidation = z.object({
  bankAccountID: z.string(),
});

export const updateBankAccountRequestValidation = z.object({
  body: z.object({
    bankAccountID: z.string(),
    bankAccount: z.object(bankAccountValidationPropsMinimal).partial(),
  }),
});

export const updateBankAccountResponseValidation = z.object({});

export const deleteBankAccountRequestValidation = z.object({
  body: z.object({
    bankAccountID: z.string(),
  }),
});

export const deleteBankAccountResponseValidation = z.object({});
