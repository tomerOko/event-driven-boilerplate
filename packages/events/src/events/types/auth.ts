import * as z from 'zod';
import { userLoggedInEventValidation } from '../validations';

export type UserLoggedInEventType = z.infer<typeof userLoggedInEventValidation>;
