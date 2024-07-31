import path from 'path';
import {
  sendPincodeRequestValidation,
  sendPincodeRespondValidation,
  signupRequestValidation,
  signupRespondValidation,
} from './validation';

export const pathMap = {
  SEND_PINCODE: {
    path: '/send-pincode',
    method: 'post',
    requestValidation: sendPincodeRequestValidation,
    responseValidation: sendPincodeRespondValidation,
  },
  SIGNUP: {
    path: '/signup',
    method: 'post',
    requestValidation: signupRequestValidation,
    responseValidation: signupRespondValidation,
  },
} as const;

export type PathMapKey = keyof typeof pathMap;
