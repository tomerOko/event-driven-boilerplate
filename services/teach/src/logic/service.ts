import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  becomeTeacherRequestType,
  becomeTeacherResponseType,
  stopTeachRequestType,
  stopTeachResponseType,
  updateTeacherDetailsRequestType,
  updateTeacherDetailsResponseType,
} from 'events-tomeroko3';

import {
  teacherCreatedPublisher,
  teacherDeactivatedPublisher,
  teacherUpdatedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const becemeTeacher = async (props: becomeTeacherRequestType['body']): Promise<becomeTeacherResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    const { email, firstName, lastName } = user;
    const teacherProps = { email, firstName, lastName, userID, ...props, isActive: true };
    const ID = await model.createTeacher(teacherProps);
    teacherCreatedPublisher({ ...teacherProps, ID });
    return { teacherID: ID };
  });
};

export const updateTeacherDetails = async (
  props: updateTeacherDetailsRequestType['body'],
): Promise<updateTeacherDetailsResponseType> => {
  return functionWrapper(async () => {
    const { teacherID, teacher: update } = props;
    const userID = getAuthenticatedID() as string;
    const teacher = await model.getTeacherByID(teacherID);
    if (!teacher) {
      throw new AppError(appErrorCodes.UPDATE_TEACHER_TEACHER_NOT_FOUND, { teacherID });
    }
    if (teacher.userID !== userID) {
      throw new AppError(appErrorCodes.UPDATE_TEACHER_WRONG_USER_ID, { teacherID, userID });
    }
    teacherUpdatedPublisher({ ...teacher, ...update });
    await model.updateTeacherByID(teacherID, update);
    return {};
  });
};

export const stopTeach = async (props: stopTeachRequestType['body']): Promise<stopTeachResponseType> => {
  return functionWrapper(async () => {
    const { teacherID } = props;
    const userID = getAuthenticatedID() as string;
    const teacher = await model.getTeacherByID(teacherID);
    if (!teacher) {
      throw new AppError(appErrorCodes.STOP_TEACH_TEACHER_NOT_FOUND, { teacherID });
    }
    if (teacher.userID !== userID) {
      throw new AppError(appErrorCodes.DEACTIVATED_TEACHER_WRONG_USER_ID, { teacherID, userID });
    }
    teacherDeactivatedPublisher({ teacherID });
    await model.updateTeacherByID(teacher.ID, { isActive: false });
    return {};
  });
};
