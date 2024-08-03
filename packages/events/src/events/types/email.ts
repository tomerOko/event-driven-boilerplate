import * as z from 'zod';
import { sendEmailEventValidation } from '../validations/email';

export type SendEmailEventType = z.infer<typeof sendEmailEventValidation>;
