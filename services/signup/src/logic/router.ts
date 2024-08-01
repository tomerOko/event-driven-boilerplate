import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const pincode = pathMap['SEND_PINCODE'];
router.post(pincode.path, validateRequest(pincode.requestValidation, pincode.responseValidation), controller.sendPincode);

const signup = pathMap['SIGNUP'];
router.post(signup.path, validateRequest(signup.requestValidation, signup.responseValidation), controller.createUser);
