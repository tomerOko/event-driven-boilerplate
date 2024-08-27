import * as z from 'zod';
import {
  sendPincodeRequestValidation,
  sendPincodeResponseValidation,
  signupRequestValidation,
  signupResponseValidation,
} from '../validation';

export type SendPincodeRequest = z.infer<typeof sendPincodeRequestValidation>;
export type SendPincodeResponse = z.infer<typeof sendPincodeResponseValidation>;
export type SignupRequest = z.infer<typeof signupRequestValidation>;
export type SignupResponse = z.infer<typeof signupRequestValidation>;
