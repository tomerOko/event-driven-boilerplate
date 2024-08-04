import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const login = pathMap.LOGIN;
router.post(login.path, validateRequest(login.requestValidation, login.responseValidation), controller.login);
