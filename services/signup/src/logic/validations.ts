import { pathMap } from 'events-tomeroko3';
import z from 'zod';

export const pincodeValidation = z.object({
  ID: z.string(),
  email: z.string().email(),
  pincode: z.string(),
});

export type Pincode = z.infer<typeof pincodeValidation>;

export const userValidation = z.object({
  ID: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type User = z.infer<typeof userValidation>;

const pincodeRequestValidation = pathMap['SEND_PINCODE'].requestValidation;

export type SendPincodePayload = z.infer<typeof pincodeRequestValidation>['body'];

const signupRequestValidation = pathMap['SIGNUP'].requestValidation;

export type SignupPayload = z.infer<typeof signupRequestValidation>['body'];
