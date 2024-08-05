import { pathMap } from 'events-tomeroko3';
import z from 'zod';

const pincodeRequestValidation = pathMap['SEND_PINCODE'].requestValidation;

export type SendPincodePayload = z.infer<typeof pincodeRequestValidation>['body'];

const signupRequestValidation = pathMap['SIGNUP'].requestValidation;

export type SignupPayload = z.infer<typeof signupRequestValidation>['body'];
