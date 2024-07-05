import jwt from 'jsonwebtoken';
import parseDuration from 'parse-duration';
import { AppError } from '../errors/appError';



const accessSecret = ENVs.jwt.accessSecret;
const refreshSecret = ENVs.jwt.refreshSecret;
const tokenExpirationTime = ENVs.jwt.tokenExpirationTime;
const refreshTokenExpirationTime = ENVs.jwt.refreshTokenExpirationTime;
const quickLoginTokenExpirationTime = ENVs.jwt.quickLoginTokenExpirationTime;


//CREATE
export type expirationTimeOptions = {
  keepExp?: boolean;
  useMinExpirationTime?: boolean;
  defaultExpirationTime?: string;
};


const getTokenExpirationTime = (payload: minimalTokenPayload, options: expirationTimeOptions): number => {
  return functionWrapperNoSync(() => {
    let expiresIn: number;
    const { exp } = payload;
    delete payload.exp; /** delete old expiration if exists */
    delete payload.iat; /** delete old issued at if exists */

    if (options.keepExp) {
      if (!exp) {
        throw new AppError(ErrorCodes.INVALID_TOKEN_EXPIRATION_TIME, 'invalid token expiration time', true);
      }
      expiresIn = exp - Math.floor(Date.now() / 1000);
    } else {
      const parsedExpirationTime = getDefaultExpirationTimeInSeconds(options.defaultExpirationTime);

      if (options.useMinExpirationTime && exp) {
        const oldExpirationTime = exp - Math.floor(Date.now() / 1000);
        expiresIn = Math.min(parsedExpirationTime, oldExpirationTime);
      } else {
        expiresIn = parsedExpirationTime;
      }
    }
    return expiresIn;
  });
};

const getDefaultExpirationTimeInSeconds = (defaultExpirationTime: string | undefined): number => {
  return functionWrapperNoSync(() => {
    if (!defaultExpirationTime) {
      throw new AppError("INVALID_TOKEN_EXPIRATION_TIME");
    }

    const parsedExpirationTime = parseDuration(defaultExpirationTime, 's');

    if (!(typeof parsedExpirationTime === 'number')) {
      throw new AppError("INVALID_TOKEN_EXPIRATION_TIME_TYPE");
    }
    return parsedExpirationTime;
  });
};

/** we allow signing of payloads contains at least 'minimalTokenPayload' properties */
export const createAccessToken = (payload: minimalTokenPayload, options: expirationTimeOptions) => {
  return functionWrapperNoSync(() => {
    const expiresIn = getTokenExpirationTime(payload, {
      keepExp: options.keepExp,
      useMinExpirationTime: true,
      defaultExpirationTime: tokenExpirationTime,
    });

    const token = jwt.sign(payload, accessSecret, { expiresIn });

    const { exp } = jwt.decode(token) as { exp: number };
    console.log('access token exp', new Date(exp * 1000));

    return token;
  });
};


/** VERIFY and EXTRACT */
const verifyAndExtractToken = (token: string, secret: string): minimalTokenPayload => {
  return functionWrapperNoSync(() => {
    try {
      /* we know the token payload contains at least minimalTokenPayload props */
      const payloadAsJsonString = jwt.verify(token, secret) as minimalTokenPayload;
      return payloadAsJsonString;
    } catch (error: any) {
      if (error?.name === 'TokenExpiredError') {
        throw new AppError(ErrorCodes.TOKEN_EXPIRED);
      } else {
        throw new AppError(ErrorCodes.TOKEN_INVALID);
      }
    }
  });
};

export const verifyAndExtractAccessToken = (token: string): minimalTokenPayload => {
  return functionWrapperNoSync(() => {
    try {
      return verifyAndExtractToken(token, accessSecret);
    } catch (error: any) {
      switch (error?.errorCode) {
        case ErrorCodes.TOKEN_EXPIRED:
          throw new AppError(ErrorCodes.ACCESS_TOKEN_EXPIRED);
        default:
          throw new AppError(ErrorCodes.ACCESS_TOKEN_INVALID);
      }
    }
  });
};

