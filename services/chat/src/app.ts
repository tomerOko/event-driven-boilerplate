import { errorHandlingMiddleware, httpLogger, newRequestStorage, routeNotFoundMiddleware } from 'common-lib-tomeroko3';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';

import { ENVs } from './configs/ENVs';
import { router } from './logic/router';

export const app = express();

/** parse json request body */
app.use(express.json({ limit: '3mb' }));

/** parse urlencoded request body */
app.use(express.urlencoded({ extended: true, limit: '3mb' }));

/** sanitize request data */
app.use(ExpressMongoSanitize());

/** gzip compression - compress response bodies */
app.use(compression());

/** enable cors */
app.use(cors());

app.use(newRequestStorage);

//need to be below newRequestStorage, depends on the transactionId added by newRequestStorage
app.use(httpLogger);

/** v1 api routes */
app.use(`/${ENVs.serviceName}`, router);

app.use(routeNotFoundMiddleware);

app.use(errorHandlingMiddleware);
