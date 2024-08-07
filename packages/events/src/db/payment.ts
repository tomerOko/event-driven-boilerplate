import { z } from 'zod';
import { bankAccountValidationProps, paymentMethodValidationProps, userValidationWithoutPasswordProps } from '../shared';

export const paymentDbValidations = {
  user: z.object(userValidationWithoutPasswordProps),
  bankAccount: z.object(bankAccountValidationProps),
  paymentMethod: z.object(paymentMethodValidationProps),
};
