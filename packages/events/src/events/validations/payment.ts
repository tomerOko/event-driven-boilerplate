import * as z from 'zod';
import { paymentEventsNames } from '../names';

export const failedPaymentEventValidation = z.object({
  type: z.literal(paymentEventsNames.FAILED_PAYMENT),
  data: z.object({
    studentID: z.string(),
    consultantID: z.string(),
    paymentMethodID: z.string(),
    callID: z.string(),
    amount: z.number(),
  }),
});

export const successfulPaymentEventValidation = z.object({
  type: z.literal(paymentEventsNames.SUCCESSFUL_PAYMENT),
  data: z.object({
    studentID: z.string(),
    consultantID: z.string(),
    paymentMethodID: z.string(),
    callID: z.string(),
    amount: z.number(),
  }),
});

export const failedWithdrawEventValidation = z.object({
  type: z.literal(paymentEventsNames.FAILED_WITHDRAW),
  data: z.object({
    userID: z.string(),
    amount: z.number(),
    bankAccountID: z.string(),
    date: z.number(),
  }),
});

export const successfulWithdrawEventValidation = z.object({
  type: z.literal(paymentEventsNames.SUCCESSFUL_WITHDRAW),
  data: z.object({
    userID: z.string(),
    amount: z.number(),
    bankAccountID: z.string(),
    date: z.number(),
  }),
});

export const paymentMethodAddedAndVerifiedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_METHOD_ADDED_AND_VERIFIED),
  data: z.object({
    userID: z.string(),
    paymentMethodID: z.string(),
  }),
});

export const paymentMethodDeletedOrDeclinedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_METHOD_DELETED_OR_DECLINED),
  data: z.object({
    userID: z.string(),
    paymentMethodID: z.string(),
  }),
});

export const paymentMethodUpdatedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_METHOD_UPDATED),
  data: z.object({
    userID: z.string(),
    paymentMethodID: z.string(),
  }),
});

export const withdrawMethodAddedAndVerifiedEventValidation = z.object({
  type: z.literal(paymentEventsNames.WITHDRAW_METHOD_ADDED_AND_VERIFIED),
  data: z.object({
    userID: z.string(),
    bankAccountID: z.string(),
  }),
});

export const withdrawMethodDeletedOrDeclinedEventValidation = z.object({
  type: z.literal(paymentEventsNames.WITHDRAW_METHOD_DELETED_OR_DECLINED),
  data: z.object({
    userID: z.string(),
    bankAccountID: z.string(),
  }),
});

export const withdrawMethodUpdatedEventValidation = z.object({
  type: z.literal(paymentEventsNames.WITHDRAW_METHOD_UPDATED),
  data: z.object({
    userID: z.string(),
    bankAccountID: z.string(),
  }),
});
