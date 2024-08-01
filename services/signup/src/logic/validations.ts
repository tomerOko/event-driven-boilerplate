import { IDValidation } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import z from 'zod';

export const pincodeValidation = z.object({
  email: z.string().email(),
  pincode: z.string(),
});

export type Pincode = z.infer<typeof pincodeValidation>;

export const pincodeDocumentValidation = z.object({
  _id: IDValidation,
  email: z.string().email(),
  pincode: z.string(),
});

export type PincodeDocument = z.infer<typeof pincodeDocumentValidation>;

export const userValidation = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type User = z.infer<typeof userValidation>;

export const userDocumentValidation = z.object({
  ID: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type UserDocument = z.infer<typeof userDocumentValidation>;

const pincodeRequestValidation = pathMap['SEND_PINCODE'].requestValidation;

export type SendPincodePayload = z.infer<typeof pincodeRequestValidation>['body'];

const signupRequestValidation = pathMap['SIGNUP'].requestValidation;

export type SignupPayload = z.infer<typeof signupRequestValidation>['body'];
