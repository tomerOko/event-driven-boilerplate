import { Auth, validateRequest } from 'common-lib-tomeroko3';
import 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const becomeTeacher = pathMap['BECOME_TEACHER'];
router.post(
  becomeTeacher.path,
  Auth('LOGGED_IN'),
  validateRequest(becomeTeacher.requestValidation, becomeTeacher.responseValidation),
  controller.becomeTeacher,
);

const updateTeacherDetails = pathMap['UPDATE_TEACHER_DETAILS'];
router.post(
  updateTeacherDetails.path,
  Auth('LOGGED_IN'),
  validateRequest(updateTeacherDetails.requestValidation, updateTeacherDetails.responseValidation),
  controller.updateTeacherDetails,
);

const stopTeach = pathMap['STOP_TEACH'];
router.post(
  stopTeach.path,
  Auth('LOGGED_IN'),
  validateRequest(stopTeach.requestValidation, stopTeach.responseValidation),
  controller.stopTeach,
);
