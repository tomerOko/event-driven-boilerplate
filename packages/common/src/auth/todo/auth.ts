// import { NextFunction, Request, Response } from 'express';

// import { IContractRole, contractRoles } from '../apiContracts/online/contract';
// import { DocumentId } from '../apiContracts/shared';
// import { nativeLogger } from '../config/logger';
// import { AppError, ErrorCodes } from '../errors/appErrors';
// import { ErrorResponse, ErrorStatusCodes } from '../errors/errorResponse';
// import { TokenPayload } from '../logic/auth/typesAndConsts';
// import * as offerShared from '../logic/offers/shared';
// import { systemRoles } from '../logic/user/typesAndConsts';
// import { getAuthDetails } from '../utils/auth';
// import { shouldBeHandled } from '../../errors/utils';
// import { functionWrapper, functionWrapperNoSync } from '../utils/functionWrapper';
// import { getNestedValue } from '../../utils/nestedValues';

// import { middlewareErrorResponseCodes } from './errorResponses';

// type authorizationOptions = {
//   /**dose not check anything */
//   allowAny?: boolean;
//   /** verified users are after TFA authentication but still not completed signing up, all their data is in their token payload - nothing in db */
//   allowVerified?: boolean;
//   /** every signed up user that not an underwriter*/
//   allowSigned?: boolean;
//   /** only signed users that are a part of any company (considered "confirmed") */
//   allowConfirmed?: boolean;
//   /** allows access to the user with the same id as the one in the provided path of the request object */
//   allowSelf?: pathToIdInReq;
//   /** allows access to all users that are listed in the company regardless of their role, with an ID equals to the one found in the provided path of the request object */
//   allowCompanyMember?: pathToIdInReq;
//   /** allows access to users that are admins in the company with an ID equals to the one found in the provided path of the request object */
//   allowCompanyAdmin?: pathToIdInReq;
//   /** allows access to users with company role "EMPLOYEE" or "COMPANY_ADMIN" in the company with an ID equals to the one found in the provided path of the request object */
//   allowCompanyEmployee?: pathToIdInReq;
//   /** allows access to user that initiated the offer with an ID equals to the one found in the provided path of the request object */
//   allowOfferInitiator?: pathToIdInReq;
//   /** allows access to users that are members of the same company as the offer initiator */
//   allowOfferCompanyMember?: pathToIdInReq;
//   /** allows access to users that their signature needed of the offer with the given id (in the path provided) */
//   allowOfferSignatory?: pathToIdInReq;
//   /** allows access to users who are company admins at the company that initiated the offer */
//   allowOfferCompanyAdmin?: pathToIdInReq;
//   /** system admin */
//   allowSbAdmin?: boolean;
// };

// type pathToIdInReq = string;

// export const authMiddleware = (options: authorizationOptions) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     return functionWrapper(async () => {
//       try {
//         if (options.allowAny) {
//           return next();
//         }

//         authentication();
//         await authorization(options, req);
//         next();
//       } catch (error) {
//         return authMiddlewareErrorHandling(error, next);
//       }
//     });
//   };
// };

// const authorization = async (options: authorizationOptions, req: Request) => {
//   return functionWrapper(async () => {
//     const authDetails = getAuthDetails();

//     if (options.allowVerified) {
//       const isVerified = !!authDetails.lastTimeVerified;
//       if (isVerified) return;
//     }

//     if (options.allowSigned) {
//       const userExist = authDetails.userId;
//       const userSigned = authDetails.signedCurrentAgreementVersion;
//       if (userExist && userSigned) {
//         return;
//       } else {
//         nativeLogger.warn('option allowSigned has failed', { userExist, userSigned });
//       }
//     }

//     if (options.allowSbAdmin) {
//       const userIsSbAdmin = authDetails.systemRole === systemRoles.SB_ADMIN;
//       if (userIsSbAdmin) return;
//     }

//     if (options.allowCompanyAdmin) {
//       const companyId = getNestedValue(req, options.allowCompanyAdmin);
//       const userIsCompanyAdmin = getCompanyRoleOfUser(companyId) === contractRoles.COMPANY_ADMIN;
//       if (userIsCompanyAdmin) return;
//     }

//     if (options.allowConfirmed) {
//       const userIsConfirmed = authDetails.activeContracts.length > 0;
//       if (userIsConfirmed) return;
//     }

//     if (options.allowCompanyMember) {
//       const companyId = getNestedValue(req, options.allowCompanyMember);
//       const userIsCompanyMember = !!getCompanyRoleOfUser(companyId);
//       if (userIsCompanyMember) return;
//     }

//     if (options.allowCompanyEmployee) {
//       const companyId = getNestedValue(req, options.allowCompanyEmployee);
//       const currentCompanyRole = getCompanyRoleOfUser(companyId);
//       const userIsCompanyEmployee =
//         currentCompanyRole === contractRoles.EMPLOYEE || currentCompanyRole === contractRoles.COMPANY_ADMIN;
//       if (userIsCompanyEmployee) return;
//     }

//     if (options.allowOfferInitiator) {
//       const offerId = getNestedValue(req, options.allowOfferInitiator);
//       const offer = await offerShared.findOfferById(offerId);
//       if (offer) {
//         const offerInitiatorId = offer.initiation.activity.userId;
//         const userIsOfferInitiator = offerInitiatorId.equals(authDetails?.userId || '');
//         if (userIsOfferInitiator) return;
//       }
//     }

//     if (options.allowOfferSignatory) {
//       const offerId = getNestedValue(req, options.allowOfferSignatory);
//       const offer = await offerShared.findOfferById(offerId);
//       if (offer) {
//         const offerSignatoriesIds = offer.internalApproval.signatories.map(
//           (signatory) => offer.getEmployeeDetails(signatory).userId,
//         );
//         const currentUserId = authDetails?.userId || '';
//         const userIsOfferSignatory = offerSignatoriesIds.some((signatoryId) => signatoryId.equals(currentUserId));
//         if (userIsOfferSignatory) return;
//       }
//     }

//     if (options.allowOfferCompanyMember) {
//       const offerId = getNestedValue(req, options.allowOfferCompanyMember);
//       const offer = await offerShared.findOfferById(offerId);
//       if (offer) {
//         const idOfCompanyOwningTheOffer = offer.initiation.investingCompany.companyId;
//         const userIsCompanyMember = !!getCompanyRoleOfUser(idOfCompanyOwningTheOffer);
//         if (userIsCompanyMember) return;
//       }
//     }

//     if (options.allowOfferCompanyAdmin) {
//       const offerId = getNestedValue(req, options.allowOfferCompanyAdmin);
//       const offer = await offerShared.findOfferById(offerId);
//       if (offer) {
//         const idOfCompanyOwningTheOffer = offer.initiation.investingCompany.companyId;
//         const userIsCompanyAdmin = getCompanyRoleOfUser(idOfCompanyOwningTheOffer) === contractRoles.COMPANY_ADMIN;

//         if (userIsCompanyAdmin) return;
//       }
//     }

//     if (options.allowOfferCompanyAdmin) {
//       const offerId = getNestedValue(req, options.allowOfferCompanyAdmin);
//       const offer = await offerShared.findOfferById(offerId);
//       if (offer) {
//         const idOfCompanyOwningTheOffer = offer.initiation.investingCompany.companyId;
//         const userIsCompanyAdmin = getCompanyRoleOfUser(idOfCompanyOwningTheOffer) === contractRoles.COMPANY_ADMIN;

//         if (userIsCompanyAdmin) return;
//       }
//     }

//     if (options.allowSelf) {
//       const userId = getNestedValue(req, options.allowSelf);
//       const userIsSelf = authDetails.userId?.equals(userId);
//       if (userIsSelf) return;
//     }

//     throw new AppError(ErrorCodes.NO_VALID_AUTH_OPTION, { authorizationOptions: options, authDetails });
//   });
// };

// const getCompanyRoleOfUser = (companyId: DocumentId): IContractRole | undefined => {
//   return functionWrapperNoSync(() => {
//     const companyIdAsDocumentId = companyId;
//     const userRoles = getAuthDetails().activeContracts;
//     const userRoleInRequestedCompany = userRoles.find((role) => role.companyId.equals(companyIdAsDocumentId));
//     const userRoleType = userRoleInRequestedCompany?.role;
//     return userRoleType;
//   });
// };

// const authentication = () => {
//   return functionWrapperNoSync(() => {
//     const authDetails = getAuthDetails();
//     validateTokenExists(authDetails);
//     validateTFA(authDetails);
//   });
// };

// const validateTokenExists = (authDetails: TokenPayload) => {
//   if (!authDetails) {
//     throw new AppError(ErrorCodes.NO_AUTH_DETAILS);
//   }
// };

// const validateTFA = (authDetails: TokenPayload) => {
//   if (!authDetails.lastTimeVerified) {
//     throw new AppError(ErrorCodes.NO_TFA);
//   }
// };
// function authMiddlewareErrorHandling(error: unknown, next: NextFunction) {
//   const appError = shouldBeHandled(error);
//   if (appError) {
//     switch (appError.errorCode) {
//       case ErrorCodes.TOO_MANY_UNAUTHORIZED_REQUESTS:
//       case ErrorCodes.NO_VALID_AUTH_OPTION:
//         next(
//           new ErrorResponse(
//             middlewareErrorResponseCodes.NOT_AUTHORIZED,
//             ErrorStatusCodes.UNAUTHORIZED,
//             'user did not pass any of the authorization options',
//           ),
//         );
//         break;
//       case ErrorCodes.NO_AUTH_DETAILS:
//         next(
//           new ErrorResponse(
//             middlewareErrorResponseCodes.NOT_AUTHENTICATED,
//             ErrorStatusCodes.NOT_AUTHENTICATED,
//             'user have not completed registration, use "/user/sign-up" route',
//           ),
//         );
//         break;
//       case ErrorCodes.NO_TFA:
//         next(
//           new ErrorResponse(
//             middlewareErrorResponseCodes.NOT_AUTHENTICATED,
//             ErrorStatusCodes.NOT_AUTHENTICATED,
//             'user have not done/completed TFA',
//           ),
//         );
//         break;
//     }
//   }
//   return next(error);
// }
