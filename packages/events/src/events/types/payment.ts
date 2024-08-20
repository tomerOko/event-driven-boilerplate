import * as z from 'zod';
import {
  failedPaymentEventValidation,
  failedWithdrawEventValidation,
  paymentMethodAddedAndVerifiedEventValidation,
  paymentMethodDeletedOrDeclinedEventValidation,
  paymentMethodUpdatedEventValidation,
  successfulPaymentEventValidation,
  successfulWithdrawEventValidation,
  withdrawMethodAddedAndVerifiedEventValidation,
  withdrawMethodDeletedOrDeclinedEventValidation,
  withdrawMethodUpdatedEventValidation,
} from '../validations/payment';

export type FailedPaymentEventType = z.infer<typeof failedPaymentEventValidation>;
export type SuccessfulPaymentEventType = z.infer<typeof successfulPaymentEventValidation>;
export type FailedWithdrawEventType = z.infer<typeof failedWithdrawEventValidation>;
export type SuccessfulWithdrawEventType = z.infer<typeof successfulWithdrawEventValidation>;
export type PaymentMethodAddedAndVerifiedEventType = z.infer<typeof paymentMethodAddedAndVerifiedEventValidation>;
export type PaymentMethodDeletedOrDeclinedEventType = z.infer<typeof paymentMethodDeletedOrDeclinedEventValidation>;
export type PaymentMethodUpdatedEventType = z.infer<typeof paymentMethodUpdatedEventValidation>;
export type WithdrawMethodAddedAndVerifiedEventType = z.infer<typeof withdrawMethodAddedAndVerifiedEventValidation>;
export type WithdrawMethodDeletedOrDeclinedEventType = z.infer<typeof withdrawMethodDeletedOrDeclinedEventValidation>;
export type WithdrawMethodUpdatedEventType = z.infer<typeof withdrawMethodUpdatedEventValidation>;
