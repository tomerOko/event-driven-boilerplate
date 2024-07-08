export const errorStatuses = {
  /** no credentials or invalid credentials */
  NOT_AUTHENTICATED: 401,
  /** valid credentials but not enough privileges */
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  BAD_INPUT: 409,
  TOO_MANY_REQUESTS: 429,
  SUPPLIER_ERROR: 460,
  INTERNAL_SERVER_ERROR: 500,
  /** operation was successful but failed to send email */
  EMAIL_SENDING_FAILED: 529,
} as const;

type ErrorStatus = (typeof errorStatuses)[keyof typeof errorStatuses];

/**
 * @param {number} statusCode - the HTTP status code to return to the client
 * @param {string} description - the description of the error is for the developer to use. not for the user.
 * @param {object} data - any data that the client might need to know about the error, like an array of validation errors, or since when the user is blocked
 */
export class ResponseOfError {
  public readonly isErrorResponse = true;
  constructor(public statusCode: ErrorStatus, public description: string, public data?: any) {}
}
