import { AppError, functionWrapper, signPayload } from 'common-lib-tomeroko3';

import { ENVs } from '../configs/ENVs';
import { newUserPublisher } from '../configs/rabbitMQ';

import * as model from './DAL';
import { appErrorCodes } from './appErrorCodes';
import { sendEmail } from './utils';
import { SendPincodePayload, User } from './validations';

export const sendPincode = async (props: SendPincodePayload) => {
  return functionWrapper(async () => {
    const sixDigitPincode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendEmail(props.email, 'here is your pin code to connect', sixDigitPincode);
    await model.setPincode(props.email, sixDigitPincode);
  });
};

export const createUser = async (props: CreateUserPayload) => {
  return functionWrapper(async () => {
    const { user, pincode } = props;
    await validatePincode(user, pincode);
    await model.createUser(user);
    const { email, firstName, lastName } = user;
    newUserPublisher({
      email,
      firstName,
      lastName,
    });
  });
};

const validatePincode = async (user: User, pincode: string) => {
  return functionWrapper(async () => {
    const pincodeDocument = await model.getPincode(user.email);
    if (!pincodeDocument) {
      throw new AppError(appErrorCodes.PINCODE_NOT_FOUND, { email: user.email });
    }
    if (pincodeDocument.pincode !== pincode) {
      throw new AppError(appErrorCodes.WRONG_PINCODE, { email: user.email });
    }
  });
};
