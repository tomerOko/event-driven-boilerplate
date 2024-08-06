import {
  addTopicRequestType,
  addTopicResponseType,
  becomeTeacherRequestType,
  becomeTeacherResponseType,
  deleteTopicRequestType,
  deleteTopicResponseType,
  stopTeachRequestType,
  stopTeachResponseType,
  updateTeacherDetailsRequestType,
  updateTeacherDetailsResponseType,
  updateTopicRequestType,
  updateTopicResponseType,
} from 'events-tomeroko3';

import { AppError, functionWrapper } from '@src/testy/src/index';

import { teacherCreatedPublisher } from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const becemeTeacher = async (props: becomeTeacherRequestType['body']): Promise<becomeTeacherResponseType> => {
  return functionWrapper(async () => {
    const { userID } = props;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    const ID = await model.createTeacher(props);
    teacherCreatedPublisher({ ...props, ID });
    return { teacherID: ID };
  });
};

// export const updateTeacherDetails = async (
//   props: updateTeacherDetailsRequestType['body'],
// ): Promise<updateTeacherDetailsResponseType> => {
//   return functionWrapper(async () => {
//     const { teacher: update, teacherID } = props;
//     const foundTeacher = await model.getTeacherByID(teacherID);
//     if (!foundTeacher) {
//       throw new AppError(appErrorCodes.TEACHER_NOT_FOUND, { teacherID });
//     }
//     await model.updateTeacherByID(teacherID, update);
//     return {};
//   });
// };

// export const stopTeach = async (props: stopTeachRequestType['body']): Promise<stopTeachResponseType> => {
//   return functionWrapper(async () => {
//     const { teacherID } = props;
//     const teacher = await model.getTeacherByID(teacherID);
//     if (!teacher) {
//       throw new AppError(appErrorCodes.TEACHER_NOT_FOUND, { teacherID });
//     }
//     await model.deleteTeacherByID(teacherID);
//     return {};
//   });
// };
