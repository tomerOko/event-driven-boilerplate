import * as z from 'zod';
import { loginRequestValidation, loginRespondValidation } from '../validation';

export type LoginRequest = z.infer<typeof loginRequestValidation>;
export type LoginResponse = z.infer<typeof loginRespondValidation>;
