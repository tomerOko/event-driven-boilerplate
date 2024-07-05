/**
 * the meaning of the error codes is to have a steady interface between the client and the server. any change here is a breaking change for the client side.
 * opposite to the error codes, the error responses don't have to be unique. (error codes have to be unique in order to find the problem in a fast way with the debugger).
 * error responses should actually be reused as much as possible so that the client will have less error codes to handle.
 */

export const middlewareErrorResponseCodes = {
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  NOT_AUTHORIZED: 'NOT_AUTHORIZED',
  UNDERWRITER_NOT_ACTIVE: 'UNDERWRITER_NOT_ACTIVE',
  TFA_DETAILS_CHANGED: 'TFA_DETAILS_CHANGED',
  ACCESS_TOKEN_EXPIRED: 'ACCESS_TOKEN_EXPIRED',
  ACCESS_TOKEN_INVALID: 'ACCESS_TOKEN_INVALID',
  TOO_MANY_REQUESTS_BY_IP: 'TOO_MANY_REQUESTS_BY_IP',
  TOO_MANY_REQUESTS_BY_EMAIL: 'TOO_MANY_REQUESTS_BY_EMAIL',
};
