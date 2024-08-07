import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { setAuthenticatedID } from '../../asyncStorage';
import { AppError, ResponseOfError } from '../../errors';
import { functionWrapper } from '../../logging';
import { UtilsState } from '../../shared/utilsState';
import { parseToken } from '../jwtUtils';

export const PermissionGroups = {
  LOGGED_IN: 'LOGGED_IN',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  EVERYONE: 'EVERYONE',
} as const;

export type PermissionGroup = keyof typeof PermissionGroups;

/**
 * Middleware to check if the user is authorized to access the route (routes can be accessed by everyone, only logged in users, or only non-logged in users)
 * the middleware also sets the authenticated ID in the async store so that later we can use 'getAuthenticatedID' to get the authenticated ID
 */
export const Auth = (permissionGroup: PermissionGroup) => (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(() => {
    const AuthenticatedId = ParseRequestAuthorization(req);
    if (AuthenticatedId) {
      setAuthenticatedID(AuthenticatedId);
    }
    const isAuthenticated = !!AuthenticatedId;
    const authorizationError = authorization(permissionGroup, isAuthenticated);
    return next(authorizationError);
  });
};

const ParseRequestAuthorization = (req: Request) => {
  return functionWrapper(() => {
    const token = req.headers.authorization;
    if (!token || typeof token !== 'string') {
      return null;
    }
    const { ID } = parseToken(token as string, UtilsState.getJwtSecret());
    return ID;
  });
};

const authorization = (permissionGroup: PermissionGroup, isAuthenticated: Boolean) => {
  switch (permissionGroup) {
    case PermissionGroups.LOGGED_IN:
      if (isAuthenticated) {
        return;
      } else {
        return new ResponseOfError(httpStatus.UNAUTHORIZED, 'This route is for signed in users only');
      }
    case PermissionGroups.NOT_LOGGED_IN:
      if (!isAuthenticated) {
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
