import z from 'zod';
import { paymentValidation } from './validations';

export type Payment = z.infer<typeof paymentValidation>;
