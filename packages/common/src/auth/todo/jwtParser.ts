// import { NextFunction, Request, Response } from 'express';


// import { shouldBeHandled } from '../../errors/utils';

// import { middlewareErrorResponseCodes } from './errorResponses';
// import { headerNames, TokenPayload } from '../../typesAndConsts';
// import { functionWrapper } from '../../functionWrapper/functionWrapper';
// import { setAuthDetails } from '../../asyncStorage';

// /**
//  * our authorization mechanism validate and update tokens on every request ENTERING the server
//  * in some scenarios where the auth details are changed, the update of the token cannot wait
//  * to the next request, because the next request will be blocked by the authorization mechanism
//  * if not updated.
//  * this is why we trigger the update of the tokens manually in specific flows
//  *
//  *  @param userId:  at signup user still don't have userId in the tokens, so we fake them and trigger the token update that will rewrite the tokens with the real userId
//  */
// export const triggerTokensUpdate = async (user: User, req: Request, res: Response): Promise<void> => {
//   return functionWrapper(async () => {
//     const payload = buildTokenPayloadByUser(user, new Date());
//     const tokens = createTokens(payload);

//     res.setHeader(headerNames.accessToken, tokens.accessToken);
//     res.setHeader(headerNames.refreshToken, tokens.refreshToken);

//     setAuthDetails(payload);
//   });
// };

// /**
//  * called on every incoming request
//  */
// export const authHeaderParser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   return functionWrapper(async () => {
//     try {
//       /** for authenticated users */
//       const accessToken = req.headers[headerNames.accessToken] as string;

//       /** for permitted api consumers */
//       const apiSecretKey = req.headers[headerNames.secretKey];

//       if (!accessToken && !apiSecretKey) return next();

//       if (accessToken) {
//         await handleAccessToken(accessToken, res);
//       }

//       if (apiSecretKey) {
//         await parseUnderwriterSecretKey(apiSecretKey);
//       }

//       return next();
//     } catch (error) {
//       const appError = shouldBeHandled(error);
//       if (appError) {
//         switch (appError.errorCode) {
//           case ErrorCodes.ACCESS_TOKEN_EXPIRED:
//             return next(
//               new ErrorResponse(
//                 middlewareErrorResponseCodes.ACCESS_TOKEN_EXPIRED,
//                 ErrorStatusCodes.NOT_AUTHENTICATED,
//                 'access token expired',
//               ),
//             );
//           default:
//             return next(
//               new ErrorResponse(
//                 middlewareErrorResponseCodes.NOT_AUTHENTICATED,
//                 ErrorStatusCodes.NOT_AUTHENTICATED,
//                 'token is not valid',
//               ),
//             );
//         }
//       }
//       next(error);
//     }
//   });
// };

// export const parseUnderwriterSecretKey = async (apiSecretKey: string | string[]) => {
//   return functionWrapper(async () => {
//     const underwriter = await underwriterShared.findUnderwriterBySecretKey(apiSecretKey as string);

//     if (!underwriter) {
//       throw new ErrorResponse(
//         middlewareErrorResponseCodes.NOT_AUTHENTICATED,
//         ErrorStatusCodes.UNAUTHORIZED,
//         `underwriter with secret key: '${apiSecretKey}' - not found`,
//       );
//     }

//     if (!underwriter.isActive) {
//       throw new ErrorResponse(
//         middlewareErrorResponseCodes.UNDERWRITER_NOT_ACTIVE,
//         ErrorStatusCodes.UNAUTHORIZED,
//         'secret key provided is not valid',
//       );
//     }

//     // currently we decided to allow all hostnames
//     // const reqHostname = req.hostname;
//     // const isAllowedHostname = isUnderwriterAllowedHostname(underwriter.allowedHostnames, reqHostname);
//     // if (!isAllowedHostname) {
//     //   throw new ErrorResponse(middlewareErrorResponseCodes.NOT_AUTHENTICATED, ErrorStatusCodes.UNAUTHORIZED, `user origin ${origin} is not allowed`);
//     // }
//     /** not that secure, but good enough since we include the secret key in the request body */
//     // const isUnderwriterAllowedHostname = (allowedHostnames: string[], userOrigin?: string): boolean => {
//     // const noHostnamesProtection = allowedHostnames.length === 0;
//     // if (noHostnamesProtection) {
//     //   return true;
//     // }
//     // if (!userOrigin) {
//     //   return false;
//     // }
//     // const isAllowedHostname = allowedHostnames.includes(userOrigin);
//     // return isAllowedHostname;
//     // return true;
//     // };

//     const underwriterAuthDetails: UnderwriterAuthDetails = {
//       _id: underwriter._id,
//       name: underwriter.name,
//       allowedHostnames: underwriter.allowedHostnames,
//       phone: underwriter.phone,
//       email: underwriter.email,
//     };
//     setUnderwriterAuthDetails(underwriterAuthDetails);
//   });
// };

// const handleAccessToken = async (accessToken: string, res: Response) => {
//   return functionWrapper(async () => {
//     const decodedAccessToken = verifyAndExtractAccessToken(accessToken) as minimalTokenPayload;

//     /** might change through the flow */
//     setAuthDetails(decodedAccessToken);

//     /** after TFA user can have token but still not be in db */
//     if (decodedAccessToken.userId) {
//       await updateTokenAccordingToUser(decodedAccessToken as TokenPayload, res);
//     }
//   });
// };

// const buildNewTokenPayload = (payloadFromProvidedToken: TokenPayload, userFromDb: User): TokenPayload => {
//   return functionWrapperNoSync(() => {
//     const newPayload = buildTokenPayloadByUser(userFromDb, payloadFromProvidedToken.lastTimeVerified);
//     newPayload.exp = payloadFromProvidedToken.exp;
//     newPayload.iat = payloadFromProvidedToken.iat;
//     return newPayload;
//   });
// };

// const updateTokenAccordingToUser = async (
//   payloadFromProvidedToken: TokenPayload,
//   res: Response<any, Record<string, any>>,
// ): Promise<void> => {
//   return functionWrapper(async () => {
//     const { userId } = payloadFromProvidedToken;
//     const userFromDb = await validateUser(userId);
//     stopIfMobileOrEmailChanged(payloadFromProvidedToken, userFromDb);
//     const newAccessPayload = buildNewTokenPayload(payloadFromProvidedToken, userFromDb);
//     await createAccessTokenAndSetHeader(newAccessPayload, res, { keepExp: true });
//   });
// };

// const stopIfMobileOrEmailChanged = (payloadFromProvidedToken: TokenPayload, userFromDb: User): void => {
//   return functionWrapperNoSync(() => {
//     const phoneChange = payloadFromProvidedToken.mobile !== userFromDb.mobile;
//     const emailChange = payloadFromProvidedToken.email !== userFromDb.email;
//     if (phoneChange || emailChange) {
//       throw new AppError(
//         ErrorCodes.VALIDATE_USER_AND_TOKENS_STATE_USER_DATA_CHANGED,
//         'user login details changed, user need to be logged out',
//       );
//     }
//   });
// };

// const createAccessTokenAndSetHeader = async (
//   newAccessPayload: TokenPayload,
//   res: Response,
//   options: { keepExp: boolean },
// ): Promise<void> => {
//   return functionWrapper(async () => {
//     const newAccessToken = createAccessToken(newAccessPayload, options);
//     /**
//      * this comment is a part of general documentation that explain each point the the system that set or update the auth details.
//      * here we update the auth details for every and only requests that contains an access token.
//      */
//     setAuthDetails(newAccessPayload);

//     res.setHeader(httpHeaders.accessToken, newAccessToken);
//   });
// };

// const validateUser = async (userId: ObjectId | undefined) => {
//   return functionWrapper(async () => {
//     const userFromDb = await userShared.getUserBy({ _id: userId });
//     if (!userFromDb) {
//       throw new AppError(ErrorCodes.VALIDATE_USER_AND_TOKENS_STATE_USER_NOT_FOUND, 'user not found');
//     }
//     if (!userFromDb.isActive) {
//       throw new AppError(ErrorCodes.VALIDATE_USER_AND_TOKENS_STATE_USER_NOT_ACTIVE, 'user not active');
//     }
//     return userFromDb;
//   });
// };
