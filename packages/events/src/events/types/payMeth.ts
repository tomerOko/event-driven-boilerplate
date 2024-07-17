import * as z from 'zod';
import { userCreatedEventValidation, userUpdatedEventValidation } from '../validations';

export type UserCreatedEventType = z.infer<typeof userCreatedEventValidation>;
export type UserUpdatedEventType = z.infer<typeof userUpdatedEventValidation>;
