import compression from 'compression';
import cors from 'cors';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';



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

/** v1 api routes */
app.use('/add-payment', router);


