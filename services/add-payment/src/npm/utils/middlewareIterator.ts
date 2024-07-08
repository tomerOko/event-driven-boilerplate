import { NextFunction, Request, RequestHandler, Response } from 'express';

export const middlewareIterator = (middlewares: Array<RequestHandler>): RequestHandler => {
  return async function (req: Request, res: Response, next: NextFunction) {
    for (const middleware of middlewares) {
      try {
        await PromisifyMiddleware(middleware, req, res);
      } catch (error) {
        return next(error);
      }
    }
    next();
  };
};

const PromisifyMiddleware = (middleware: RequestHandler, req: Request, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (err) => {
      if (err) {
        reject(err);
      }
      resolve(undefined);
    });
  });
};
