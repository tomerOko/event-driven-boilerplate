import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import { becomeTeacherRequestType } from 'events-tomeroko3';

import { newUserPublisher } from '../configs/rabbitMQ';
import { emailPublisher } from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';
import { SignupPayload } from './validations';

export const becemeTeacher = async (props: becomeTeacherRequestType['body']) => {
  return functionWrapper(async () => {
    const user
    await model.insertTeacher(props.email, sixDigitPincode);
  });
};

export const signup = async (props: SignupPayload) => {
  return functionWrapper(async () => {
    const { email, firstName, lastName, password, pincode } = props;
    await validatePincode(email, pincode);
    const ID = await model.signup({ email, firstName, lastName, password });
    newUserPublisher({
      email,
      firstName,
      lastName,
      password,
      ID,
    });
  });
};

const validatePincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    const pincodeDocument = await model.getPincode(email);
    if (!pincodeDocument) {
      throw new AppError(appErrorCodes.PINCODE_NOT_FOUND, { email });
    }
    if (pincodeDocument.pincode !== pincode) {
      throw new AppError(appErrorCodes.WRONG_PINCODE, { email });
    }
  });
};
