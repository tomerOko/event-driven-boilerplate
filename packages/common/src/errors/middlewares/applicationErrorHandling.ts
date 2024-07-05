import { NextFunction, Request, Response } from 'express';

import { getTransactionId, setErrorInAsyncStore } from '../../middlewares/asyncStorage';
import { sendSlackGeneralErrors } from '../../utils/slack/slack';
import { CommonErrorResponseCodes, ErrorResponse, ErrorStatusCodes } from '../errorResponse';

export const routeNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //todo: feature: add a header for all client requests that will indicate if the request is from the user by the url or from the client js code (axios requests)
  const errorResponse = new ErrorResponse(
    'NOT_FOUND',
    ErrorStatusCodes.NOT_FOUND,
    `Path ${req.originalUrl} does not exist for ${req.method} method`,
  );
  return next(errorResponse);
};

// must take 4 args to be recognized as an error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlingMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
  const thisResponseIsABug = !error.isErrorResponse;
  if (thisResponseIsABug) {
    error = await handleBugs(error);
  }
  handleErrorResponse(error, res);
};

const handleBugs = async (error: any) => {
  await logTheBugToSlack(error);
  error = createGeneralErrorResponse();
  return error;
};

const createGeneralErrorResponse = (): ErrorResponse => {
  return new ErrorResponse(
    CommonErrorResponseCodes.INTERNAL_SERVER_ERROR,
    ErrorStatusCodes.INTERNAL_SERVER_ERROR,
    "We're sorry, something went wrong, please try again later",
  );
};

const handleErrorResponse = (error: ErrorResponse, res: Response) => {
  setErrorInAsyncStore(error); //for the use of the httpLogger middleware
  sendResponseAsItIs(error, res);
};

//add comment about responses being logged at the httpLogger middleware
const sendResponseAsItIs = (error: ErrorResponse, res: Response) => {
  const { name, statusCode, description, data } = error;
  const transactionId = getTransactionId();
  const errorProps = { name, description, data, transactionId };

  res.status(statusCode).send({ error: errorProps });
};

const logTheBugToSlack = async (error: any) => {
  const isAppError = error.errorCode;
  const errorData: any = {
    errorName: error.message,
    transactionId: getTransactionId(),
    reason: isAppError
      ? 'this error developed and thrown intentionally, it just was not handled'
      : 'this is an unexpected native error, please follow the logs of the transaction id to find the source of the error',
    isAppError: isAppError /* our custom errors class has this prop, native errors do not */,
    isNativeError: !isAppError /* this code looks stupid, but for the reader of the log it makes sense */,
  };

  if (isAppError) {
    errorData.errorData = error.errorData;
  } else {
    errorData.stack = error.stack;
  }

  await sendSlackGeneralErrors({
    header: error.message,
    data: errorData,
  });
};
