import { z } from 'zod';

export const sendPincodeRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const sendPincodeRespondValidation = z.object({});

export const signupRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    pincode: z.string(),
  }),
});

export const signupRespondValidation = z.object({
  body: z.object({
    token: z.string(),
  }),
});
