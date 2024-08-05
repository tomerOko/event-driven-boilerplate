import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const becomeTeacher = pathMap['BECOME_TEACHER'];
router.post(
  becomeTeacher.path,
  validateRequest(becomeTeacher.requestValidation, becomeTeacher.responseValidation),
  controller.becomeTeacher,
);

const updateTeacherDetails = pathMap['UPDATE_TEACHER_DETAILS'];
router.post(
  updateTeacherDetails.path,
  validateRequest(updateTeacherDetails.requestValidation, updateTeacherDetails.responseValidation),
  controller.signup,
);

const stopTeach = pathMap['STOP_TEACH'];
router.post(stopTeach.path, validateRequest(stopTeach.requestValidation, stopTeach.responseValidation), controller.signup);

const addTopic = pathMap['ADD_TOPIC'];
router.post(addTopic.path, validateRequest(addTopic.requestValidation, addTopic.responseValidation), controller.signup);

const updateTopic = pathMap['UPDATE_TOPIC'];
router.post(updateTopic.path, validateRequest(updateTopic.requestValidation, updateTopic.responseValidation), controller.signup);

const deleteTopic = pathMap['DELETE_TOPIC'];
router.post(deleteTopic.path, validateRequest(deleteTopic.requestValidation, deleteTopic.responseValidation), controller.signup);
