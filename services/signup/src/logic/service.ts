import { AppError, functionWrapper, signPayload } from 'common-lib-tomeroko3';

import { ENVs } from '../configs/ENVs';
import { channel } from '../configs/rabbitConnections';

import * as model from './DAL';
import { appErrorCodes } from './appErrorCodes';
import { sendEmail } from './utils';
import { CreateUserPayload, SendPincodePayload, SignInPayload, User } from './validations';

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
    delete (user as any)._id;
    publishNewUserEvent(user);
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

const publishNewUserEvent = (user: User) => {
  return functionWrapper(() => {
    const queueName = 'userQueue';
    channel.assertQueue(queueName, {
      durable: false,
    });
    const msg = JSON.stringify({ type: 'new user', data: user });
    channel.sendToQueue(queueName, Buffer.from(msg));
  });
};

export const signIn = async (props: SignInPayload) => {
  return functionWrapper(async () => {
    const userDocument = await model.getUserByEmail(props.email);
    if (!userDocument) {
      throw new AppError(appErrorCodes.USER_WITH_THIS_EMAIL_NOT_FOUND, { email: props.email });
    }
    if (userDocument.password !== props.password) {
      throw new AppError(appErrorCodes.WRONG_PASSWORD, { email: props.email });
    }
    const token = signPayload(props.email, ENVs.jwtSecret);
    return token;
  });
};
