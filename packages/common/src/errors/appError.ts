/**
 * @class AppError
 * @extends Error
 * @classdesc a modified version of the Error class to fit the needs of the application's error handling
 * @param {string} errorCode - a string coming from the errorCodes dictionary. not just any string because in order to find the error with the debugger as fast as possible, the error code should be unique so that in quick search we can find the where the error is thrown
 * @param {object} errorData - any data the controller might want to pass to the client
 * @param {boolean} isOperational - Is error operational (expected) or programmatic error (a bug). 'classic' errors that do not have this property will not pass a flag like 'if (!error.isOperational) throw("a bug found")'
 */
export class AppError extends Error {
  public readonly isAppError = true;

  constructor(public errorCode: string, public errorData: Record<string, any> = {}, public isOperational = true) {
    super(errorCode);
  }
}
