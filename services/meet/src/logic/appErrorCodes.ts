/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const appErrorCodes = {
  USER_WITH_THIS_EMAIL_NOT_FOUND: 'USER_WITH_THIS_EMAIL_NOT_FOUND',
  TEACHER_ALREADY_EXISTS: 'TEACHER_ALREADY_EXISTS',
} as const;

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes];
