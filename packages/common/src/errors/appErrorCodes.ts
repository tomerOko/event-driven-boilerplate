export const AppErrorCodes = {
  MOCK_ERROR: 'MOCK_ERROR',
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
} as const;

export type AppErrorCode = typeof AppErrorCodes[keyof typeof AppErrorCodes];

