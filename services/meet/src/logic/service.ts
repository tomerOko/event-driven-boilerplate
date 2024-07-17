import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import { TeachDeleteRequest, TeachPostRequest, TeachPutRequest } from 'events-tomeroko3';

import { newTeacherPublisher } from '../configs/rabbitConnections';

import * as model from './DAL';
import { appErrorCodes } from './appErrorCodes';

// export const updateTeacherDetails = async (
//   req: Request<any, any, TeachPutRequest['body']>,
//   res: Response,
//   next: NextFunction,
// ) => {
//   return functionWrapper(async () => {
//     try {
//       const payload = req.body;
//       await service.updateTeacherDetails(payload);
//       res.status(httpStatus.OK).send({});
//     } catch (error) {
//       const handlerProps: ErrorHandlerParams = {};
//       // handlerProps[appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND] = [httpStatus.CONFLICT, 'user with this email not found'];
//       // handlerProps[appErrorCodes.WRONG_PASSWORD] = [httpStatus.CONFLICT, 'user entered wrong password'];
//       errorHandler(handlerProps)(error, next);
//     }
//   });
// };

// export const stopTeach = async (req: Request, res: Response, next: NextFunction) => {
//   return functionWrapper(async () => {
//     try {
//       const params = req.params as TeachDeleteRequest['params'];
//       await service.stopTeach(params);
//       res.status(httpStatus.OK).send({});
//     } catch (error) {
//       const handlerProps: ErrorHandlerParams = {};
//       // handlerProps[appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND] = [httpStatus.CONFLICT, 'user with this email not found'];
//       // handlerProps[appErrorCodes.WRONG_PASSWORD] = [httpStatus.CONFLICT, 'user entered wrong password'];
//       errorHandler(handlerProps)(error, next);
//     }
//   });
// };

export const teach = async (props: TeachPostRequest['body']) => {
  return functionWrapper(async () => {
    const { email } = props;
    const user = await model.findUser({ email });
    if (!user) {
      throw new AppError(appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND);
    }
    const existingTeacher = await model.findTeacher({ email });
    if (existingTeacher) {
      throw new AppError(appErrorCodes.TEACHER_ALREADY_EXISTS);
    }
    await model.createTeacher({ ...props, fistName: user.firstName, lastName: user.lastName });
    newTeacherPublisher(props);
  });
};

export const updateTeacherDetails = async (props: TeachPutRequest['body']) => {
  return functionWrapper(async () => {
    const { email } = props;
    const teacher = await model.findTeacher({ email });
    if (!teacher) {
      throw new AppError(appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND);
    }
    await model.updateTeacherByEmail({ ...props, fistName: teacher.fistName, lastName: teacher.lastName });
  });
};

export const stopTeach = async (props: TeachDeleteRequest['params']) => {
  return functionWrapper(async () => {
    const { email } = props;
    const teacher = await model.findTeacher({ email });
    if (!teacher) {
      throw new AppError(appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND);
    }
    await model.deleteTeacher({ email });
  });
};
