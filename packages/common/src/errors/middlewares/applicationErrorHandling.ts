import { NextFunction, Request, Response } from 'express';
import { errorStatuses, ResponseOfError } from '../ResponseOfError';
import { getTransactionId, setError } from '../../asyncStorage/utils';

export const routeNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errorResponse = new ResponseOfError(
    errorStatuses.NOT_FOUND,
    `Path ${req.originalUrl} does not exist for ${req.method} method`,
  );
  return next(errorResponse);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlingMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
  const isErrorResponse = error.isErrorResponse;
  const errorResponse = isErrorResponse ? error : createGeneralErrorResponse();
  handleErrorResponse(errorResponse, res);
};

const createGeneralErrorResponse = (): ResponseOfError => {
  return new ResponseOfError(
    errorStatuses.INTERNAL_SERVER_ERROR,
    "We're sorry, something went wrong, please try again later",
  );
};

const handleErrorResponse = (error: ResponseOfError, res: Response) => {
  setError(error); //for the use of the httpLogger middleware
  sendError(error, res);
};

const sendError = (error: ResponseOfError, res: Response) => {
  const { statusCode, description, data } = error;
  const transactionId = getTransactionId();
  const errorProps = { description, data, transactionId };
  res.status(statusCode).send({ error: errorProps });
};

