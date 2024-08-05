import { AppError, functionWrapper } from 'common-lib-tomeroko3';

import { newUserPublisher } from '../configs/rabbitMQ';
import { emailPublisher } from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';
import { SendPincodePayload, SignupPayload } from './validations';

export const sendPincode = async (props: SendPincodePayload) => {
  return functionWrapper(async () => {
    const sixDigitPincode = Math.floor(100000 + Math.random() * 900000).toString();
    emailPublisher({
      email: props.email,
      subject: 'Pincode',
      content: `here is your pin code to connect: ${sixDigitPincode}`,
    });
    console.log(`here is your pin code to connect: ${sixDigitPincode}`);
    await model.setPincode(props.email, sixDigitPincode);
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
