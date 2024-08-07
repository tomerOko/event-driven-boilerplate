import * as z from 'zod';
import {
  addBankAccountRequestValidation,
  addBankAccountResponseValidation,
  updateBankAccountRequestValidation,
  updateBankAccountResponseValidation,
  deleteBankAccountRequestValidation,
  deleteBankAccountResponseValidation,
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  deletePaymentMethodRequestValidation,
  deletePaymentMethodResponseValidation,
} from '../validation/payment';

export type addBankAccountRequestType = z.infer<typeof addBankAccountRequestValidation>;
export type addBankAccountResponseType = z.infer<typeof addBankAccountResponseValidation>;

export type updateBankAccountRequestType = z.infer<typeof updateBankAccountRequestValidation>;
export type updateBankAccountResponseType = z.infer<typeof updateBankAccountResponseValidation>;

export type deleteBankAccountRequestType = z.infer<typeof deleteBankAccountRequestValidation>;
export type deleteBankAccountResponseType = z.infer<typeof deleteBankAccountResponseValidation>;

export type addPaymentMethodRequestType = z.infer<typeof addPaymentMethodRequestValidation>;
export type addPaymentMethodResponseType = z.infer<typeof addPaymentMethodResponseValidation>;

export type updatePaymentMethodRequestType = z.infer<typeof updatePaymentMethodRequestValidation>;
export type updatePaymentMethodResponseType = z.infer<typeof updatePaymentMethodResponseValidation>;

export type deletePaymentMethodRequestType = z.infer<typeof deletePaymentMethodRequestValidation>;
export type deletePaymentMethodResponseType = z.infer<typeof deletePaymentMethodResponseValidation>;
