import { AppError, functionWrapper, signToken } from 'common-lib-tomeroko3';
import { LoginMethod, LoginRequest, LoginResponse, loginMethods } from 'events-tomeroko3';
import { OAuth2Client } from 'google-auth-library';
import { validate } from 'uuid';

import { ENVs } from '../configs/ENVs';
import { User } from '../configs/mongoDB/initialization';
import { userLoginPublisher } from '../configs/rabbitMQ';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const login = async (props: LoginRequest['body']): Promise<LoginResponse> => {
  return functionWrapper(async () => {
    const { email, loginMethod, methodSecret } = props;

    const user = await model.getUserByEmail(email);
    if (!user) {
      throw new AppError(appErrorCodes.CANT_LOGIN_USER_NOT_FOUND, { email }, true);
    }
    validateLoginByMethod(loginMethod, methodSecret, user);

    const { ID, firstName, lastName } = user;
    userLoginPublisher({
      email,
      ID,
    });

    const token = signToken({ ID }, ENVs.jwtSecret);
    return {
      token,
      user: {
        ID,
        email,
        firstName,
        lastName,
      },
    };
  });
};

const validateLoginByMethod = (loginMethod: LoginMethod, methodSecret: string, user: User) => {
  switch (loginMethod) {
    case loginMethods.PASSWORD:
      return user.password === methodSecret;
    case loginMethods.GOOGLE:
      return validateGoolgeToken(methodSecret, user);
    default:
      throw new AppError(appErrorCodes.CANT_LOGIN_UNKNOWN_METHOD, { loginMethod }, true);
  }
};

const validateGoolgeToken = async (token: string, user: User) => {
  const client = new OAuth2Client();
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    if (email === user.email) {
      return true;
    } else {
      throw new AppError(appErrorCodes.TOKEN_DOSE_NOT_MATCH_USER, {}, true);
    }
  } catch (error) {
    throw new AppError(appErrorCodes.BAD_GOOGLE_TOKEN, {}, true);
  }
};
