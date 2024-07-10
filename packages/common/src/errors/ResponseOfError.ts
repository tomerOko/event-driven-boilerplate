/**
 * @param {number} statusCode - the HTTP status code to return to the client
 * @param {string} description - the description of the error is for the developer to use. not for the user.
 * @param {object} data - any data that the client might need to know about the error, like an array of validation errors, or since when the user is blocked
 */
export class ResponseOfError {
  public readonly isErrorResponse = true;
  constructor(public statusCode: number, public description: string, public data?: any) {}
}
