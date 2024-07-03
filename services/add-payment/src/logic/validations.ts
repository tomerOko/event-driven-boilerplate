import z from 'zod';

export const paymentValidation = z.object({
    _id: z.string(),
    holderName: z.string(),
    cardNumber: z.string(),
    expirationDate: z.string(),
    cvv: z.string(),
});