/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const appErrorCodes = {
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  CONFIG_VALIDATION_ERROR: 'CONFIG_VALIDATION_ERROR',
  WRONG_PINCODE: 'WRONG_PINCODE',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  PINCODE_NOT_FOUND: 'PINCODE_NOT_FOUND',
  USER_WITH_THIS_EMAIL_NOT_FOUND: 'USER_WITH_THIS_EMAIL_NOT_FOUND',
} as const;

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes];
