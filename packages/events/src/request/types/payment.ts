import * as z from 'zod';
import {
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  addWithdrawMethodRequestValidation,
  addWithdrawMethodResponseValidation,
  deletePaymentMethodRequestValidation,
  deletePaymentMethodResponseValidation,
  deleteWithdrawMethodRequestValidation,
  deleteWithdrawMethodResponseValidation,
  getPaymentMethodsRequestValidation,
  getPaymentMethodsResponseValidation,
  getWithdrawMethodsRequestValidation,
  getWithdrawMethodsResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  updateWithdrawMethodRequestValidation,
  updateWithdrawMethodResponseValidation,
} from '../validation/payment';

export type getWithdrawMethodsRequestType = z.infer<typeof getWithdrawMethodsRequestValidation>;
export type getWithdrawMethodsResponseType = z.infer<typeof getWithdrawMethodsResponseValidation>;

export type addWithdrawMethodRequestType = z.infer<typeof addWithdrawMethodRequestValidation>;
export type addWithdrawMethodResponseType = z.infer<typeof addWithdrawMethodResponseValidation>;

export type updateWithdrawMethodRequestType = z.infer<typeof updateWithdrawMethodRequestValidation>;
export type updateWithdrawMethodResponseType = z.infer<typeof updateWithdrawMethodResponseValidation>;

export type deleteWithdrawMethodRequestType = z.infer<typeof deleteWithdrawMethodRequestValidation>;
export type deleteWithdrawMethodResponseType = z.infer<typeof deleteWithdrawMethodResponseValidation>;

export type getPaymentMethodRequestType = z.infer<typeof getPaymentMethodsRequestValidation>;
export type getPaymentMethodResponseType = z.infer<typeof getPaymentMethodsResponseValidation>;

export type addPaymentMethodRequestType = z.infer<typeof addPaymentMethodRequestValidation>;
export type addPaymentMethodResponseType = z.infer<typeof addPaymentMethodResponseValidation>;

export type updatePaymentMethodRequestType = z.infer<typeof updatePaymentMethodRequestValidation>;
export type updatePaymentMethodResponseType = z.infer<typeof updatePaymentMethodResponseValidation>;

export type deletePaymentMethodRequestType = z.infer<typeof deletePaymentMethodRequestValidation>;
export type deletePaymentMethodResponseType = z.infer<typeof deletePaymentMethodResponseValidation>;
