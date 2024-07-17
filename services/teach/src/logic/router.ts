import { validateRequest } from 'common-lib-tomeroko3';
import {
  teachDeleteRequestValidation,
  teachPostRequestValidation,
  teachPutRequestValidation,
} from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

router.post('/become-treacher', validateRequest(teachPostRequestValidation), controller.teach);

router.post('/update-teacher-details', validateRequest(teachPutRequestValidation), controller.updateTeacherDetails);

router.post('/stop-teach', validateRequest(teachDeleteRequestValidation), controller.stopTeach);
