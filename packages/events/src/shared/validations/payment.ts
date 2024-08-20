import z from 'zod';
import { countries, Country, Gender, genders, Language, languages } from '../dictionaries';

export const paymentMethodValidationPropsMinimal = {
  holderName: z.string(),
  holderID: z.string(),
  number: z.string(),
  expirationDate: z.string(),
  cvv: z.string(),
  postalCode: z.string(),
};

export const paymentMethodValidationProps = {
  ID: z.string(),
  userID: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  ...paymentMethodValidationPropsMinimal,
};

export const withdrawMethodValidationPropsMinimal = {
  holderName: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  brunchNumber: z.string(),
};

export const withdrawMethodValidationProps = {
  ID: z.string(),
  userID: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  ...withdrawMethodValidationPropsMinimal,
};
