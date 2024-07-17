import { IDValidation } from 'common-lib-tomeroko3';
import z from 'zod';

export const chatValidationProps = {
  senderID: IDValidation,
  receiverID: IDValidation,
  date: z.number().positive(),
  message: z.string(),
};
