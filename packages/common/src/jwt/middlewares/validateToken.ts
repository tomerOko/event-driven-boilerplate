import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { setAuthenticatedEmail } from '../../asyncStorage';
import { AppError, ResponseOfError } from '../../errors';
import { functionWrapper } from '../../logging';
import { UtilsState } from '../../shared/utilsState';
import { parseToken } from '../jwtParser';

export const PermissionGroups = {
  LOGGED_IN: 'LOGGED_IN',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  EVERYONE: 'EVERYONE',
} as const;

export type PermissionGroup = keyof typeof PermissionGroups;

export const Auth = (permissionGroup: PermissionGroup) => (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(() => {
    const email = ParseRequestAuthorization(req);
    if (email) {
      setAuthenticatedEmail(email);
    }
    const authorizationError = authorization(permissionGroup, email);
    return next(authorizationError);
  });
};

const ParseRequestAuthorization = (req: Request) => {
  return functionWrapper(() => {
    const token = req.headers.authorization;
    if (!token || typeof token !== 'string') {
      return null;
    }
    const email = parseToken(token as string, UtilsState.getJwtSecret());
    return email;
  });
};

const authorization = (permissionGroup: PermissionGroup, email: string | null) => {
  switch (permissionGroup) {
    case PermissionGroups.LOGGED_IN:
      if (email) {
        return;
      } else {
        return new ResponseOfError(httpStatus.UNAUTHORIZED, 'This route is for signed in users only');
      }
    case PermissionGroups.NOT_LOGGED_IN:
      if (!email) {
        return;
      } else {
        return new ResponseOfError(httpStatus.UNAUTHORIZED, 'This route is for non-signed in users only');
      }
    case PermissionGroups.EVERYONE:
      return;
    default:
      throw new AppError('Unknown permission group');
  }
};
