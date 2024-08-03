import { AppError, functionWrapper } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

import { newUserPublisher } from '../configs/rabbitMQ';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';
import { sendEmail } from './utils';
import { SendPincodePayload, SignupPayload } from './validations';

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
      password,
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
