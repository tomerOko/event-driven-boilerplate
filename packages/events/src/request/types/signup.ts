import * as z from 'zod';
import { sendPincodeRequestValidation, signupRequestValidation } from '../validation';

export type SendPincodeRequest = z.infer<typeof sendPincodeRequestValidation>;
export type SignupRequest = z.infer<typeof signupRequestValidation>;
