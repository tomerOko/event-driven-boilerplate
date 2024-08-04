/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const appErrorCodes = {
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  CONFIG_VALIDATION_ERROR: 'CONFIG_VALIDATION_ERROR',
  CANT_LOGIN_USER_NOT_FOUND: 'CANT_LOGIN_USER_NOT_FOUND',
  CANT_LOGIN_UNKNOWN_METHOD: 'CANT_LOGIN_UNKNOWN_METHOD',
  BAD_GOOGLE_TOKEN: 'BAD_GOOGLE_TOKEN',
  TOKEN_DOSE_NOT_MATCH_USER: 'TOKEN_DOSE_NOT_MATCH_USER',
} as const;

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes];
