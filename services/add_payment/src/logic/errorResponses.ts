/**
 * the meaning of the error codes is to have a steady interface between the client and the server. any change here is a breaking change for the client side.
 * opposite to the error codes, the error responses don't have to be unique. (error codes have to be unique in order to find the problem in a fast way with the debugger).
 * error responses should actually be reused as much as possible so that the client will have less error codes to handle.
 */

export const ErrorResponseCodes = {
  MOCK_ERROR: 'MOCK_ERROR',
};
