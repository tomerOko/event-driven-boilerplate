import { IDValidation } from 'common-lib-tomeroko3';
import z from 'zod';

export const pincodeDocumentValidation = z.object({
  _id: IDValidation.optional(),
  email: z.string().email(),
  pincode: z.string(),
});

export type PincodeDocument = z.infer<typeof pincodeDocumentValidation>;

export const userDocumentValidation = z.object({
  _id: IDValidation.optional(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type UserDocument = z.infer<typeof userDocumentValidation>;

export const sendPincode = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type SendPincodePayload = z.infer<typeof sendPincode>['body'];

export const createUser = z.object({
  body: z.object({
    pincode: z.string(),
    user: z.object({
      email: z.string().email(),
      password: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    }),
  }),
});

export type CreateUserPayload = z.infer<typeof createUser>['body'];

export const signIn = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type SignInPayload = z.infer<typeof signIn>['body'];
