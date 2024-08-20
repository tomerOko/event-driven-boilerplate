import * as z from 'zod';
import {
  failedPaymentEventValidation,
  failedwithdraeEventValidation,
  paymentMethodAddedAndVerifiedEventValidation,
  paymentMethodDeletedOrDeclinedEventValidation,
  paymentMethodUpdatedEventValidation,
  successfulPaymentEventValidation,
  successfulwithdraeEventValidation,
  withdrawMethodAddedAndVerifiedEventValidation,
  withdrawMethodDeletedOrDeclinedEventValidation,
  withdrawMethodUpdatedEventValidation,
} from '../validations/payment';

export type FailedPaymentEventType = z.infer<typeof failedPaymentEventValidation>;
export type SuccessfulPaymentEventType = z.infer<typeof successfulPaymentEventValidation>;
export type FailedwithdraeEventType = z.infer<typeof failedwithdraeEventValidation>;
export type SuccessfulwithdraeEventType = z.infer<typeof successfulwithdraeEventValidation>;
export type PaymentMethodAddedAndVerifiedEventType = z.infer<typeof paymentMethodAddedAndVerifiedEventValidation>;
export type PaymentMethodDeletedOrDeclinedEventType = z.infer<typeof paymentMethodDeletedOrDeclinedEventValidation>;
export type PaymentMethodUpdatedEventType = z.infer<typeof paymentMethodUpdatedEventValidation>;
export type withdraeMethodAddedAndVerifiedEventType = z.infer<typeof withdrawMethodAddedAndVerifiedEventValidation>;
export type withdraeMethodDeletedOrDeclinedEventType = z.infer<typeof withdrawMethodDeletedOrDeclinedEventValidation>;
export type withdraeMethodUpdatedEventType = z.infer<typeof withdrawMethodUpdatedEventValidation>;
