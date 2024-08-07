import * as z from 'zod';
import {
  failedPaymentEventValidation,
  failedWithrawEventValidation,
  paymentMethodAddedAndVerifiedEventValidation,
  paymentMethodDeletedOrDeclinedEventValidation,
  paymentMethodUpdatedEventValidation,
  successfulPaymentEventValidation,
  successfulWithrawEventValidation,
  withrawMethodAddedAndVerifiedEventValidation,
  withrawMethodDeletedOrDeclinedEventValidation,
  withrawMethodUpdatedEventValidation,
} from '../validations/payment';

export type FailedPaymentEventType = z.infer<typeof failedPaymentEventValidation>;
export type SuccessfulPaymentEventType = z.infer<typeof successfulPaymentEventValidation>;
export type FailedWithrawEventType = z.infer<typeof failedWithrawEventValidation>;
export type SuccessfulWithrawEventType = z.infer<typeof successfulWithrawEventValidation>;
export type PaymentMethodAddedAndVerifiedEventType = z.infer<typeof paymentMethodAddedAndVerifiedEventValidation>;
export type PaymentMethodDeletedOrDeclinedEventType = z.infer<typeof paymentMethodDeletedOrDeclinedEventValidation>;
export type PaymentMethodUpdatedEventType = z.infer<typeof paymentMethodUpdatedEventValidation>;
export type WithrawMethodAddedAndVerifiedEventType = z.infer<typeof withrawMethodAddedAndVerifiedEventValidation>;
export type WithrawMethodDeletedOrDeclinedEventType = z.infer<typeof withrawMethodDeletedOrDeclinedEventValidation>;
export type WithrawMethodUpdatedEventType = z.infer<typeof withrawMethodUpdatedEventValidation>;
