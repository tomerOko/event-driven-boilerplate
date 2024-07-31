import { IDValidation } from 'common-lib-tomeroko3';
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
  _id: IDValidation,
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
    user: userValidation,
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

/** user details service - add address */
export const addressValidation = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

/** payment service - add credit card */
export const paymentValidation = z.object({
  cardNumber: z.string(),
  expiryDate: z.string(),
  cvv: z.string(),
  cardHolder: z.string(),
});

/** stock service */
export const itemValidation = z.object({
  name: z.string(),
  price: z.number(),
  logoUrl: z.string(),
  description: z.string(),
  galleryUrls: z.array(z.string()),
  stockQuantity: z.number(),
});
