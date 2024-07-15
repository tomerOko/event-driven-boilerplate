import { validateRequest } from 'common-lib-tomeroko3';
import {
  beTeacherDeleteRequestValidation,
  beTeacherPostRequestValidation,
  beTeacherPutRequestValidation,
} from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

router.post('/become-treacher', validateRequest(beTeacherPostRequestValidation), controller.becomeTeacher);

router.post('/update-teacher-details', validateRequest(beTeacherPutRequestValidation), controller.updateTeacherDetails);

router.post('/stop-teach', validateRequest(beTeacherDeleteRequestValidation), controller.stopTeach);
