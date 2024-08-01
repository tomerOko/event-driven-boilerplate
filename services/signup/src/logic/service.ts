import { AppError, functionWrapper, signPayload } from 'common-lib-tomeroko3';

import { ENVs } from '../configs/ENVs';
import { newUserPublisher } from '../configs/rabbitMQ';

import * as model from './DAL';
import { appErrorCodes } from './appErrorCodes';
import { sendEmail } from './utils';
import { SendPincodePayload, SignupPayload, User } from './validations';

export const sendPincode = async (props: SendPincodePayload) => {
  return functionWrapper(async () => {
    const sixDigitPincode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendEmail(props.email, 'here is your pin code to connect', sixDigitPincode);
    await model.setPincode(props.email, sixDigitPincode);
  });
};

export const signup = async (props: SignupPayload) => {
  return functionWrapper(async () => {
    const { email, firstName, lastName, password, pincode } = props;
    await validatePincode(email, pincode);
    await model.signup({ email, firstName, lastName, password });
    newUserPublisher({
      email,
      firstName,
      lastName,
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
