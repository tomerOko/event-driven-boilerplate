/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const AppErrorCodes = {
  MOCK_ERROR: 'MOCK_ERROR',
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  CONFIG_VALIDATION_ERROR: 'CONFIG_VALIDATION_ERROR',
  CANT_CREATE_PAYMENT_WITHOUT_USER: 'CANT_CREATE_PAYMENT_WITHOUT_USER',
} as const;

export type AppErrorCode = (typeof AppErrorCodes)[keyof typeof AppErrorCodes];
