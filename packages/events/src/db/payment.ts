import { z } from 'zod';
import { withdrawMethodValidationProps, paymentMethodValidationProps, userValidationWithoutPasswordProps } from '../shared';

export const paymentDbValidations = {
  user: z.object(userValidationWithoutPasswordProps),
  withdrawMethod: z.object(withdrawMethodValidationProps),
  paymentMethod: z.object(paymentMethodValidationProps),
};
