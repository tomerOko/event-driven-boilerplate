import { validateRequest } from 'common-lib-tomeroko3';
import express from 'express';

import * as controller from './controller';
import * as validations from './validations';

export const router = express.Router();

router.get('/test', controller.test);

router.post('/sendPincode', validateRequest(validations.sendPincode), controller.sendPincode);

router.post('/createUser', validateRequest(validations.createUser), controller.createUser);

router.post('/signIn', validateRequest(validations.signIn), controller.signIn);
