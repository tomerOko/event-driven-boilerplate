import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import { updatePaymentMethodRequestType, updatePaymentMethodResponseType } from 'events-tomeroko3';
// export const updatePaymentMethod = async (
//   props: updatePaymentMethodRequestType['body'],
// ): Promise<updatePaymentMethodResponseType> => {
//   return functionWrapper(async () => {
//     const { paymentMethod: update, paymentMethodID } = props;
//     const userID = getAuthenticatedID() as string;
//     const paymentMethod = await model.getPaymentMethodById(paymentMethodID);
//     if (!paymentMethod) {
//       throw new AppError(AppErrorCodes.UPDATE_PAYMENT_METHOD_NOT_FOUND, { paymentMethodID });
//     }
//     if (paymentMethod.userID !== userID) {
//       throw new AppError(AppErrorCodes.UPDATE_PAYMENT_METHOD_WRONG_USER_ID, { paymentMethodID, userID });
//     }
//     paymentMethodUpdatedPublisher({ paymentMethodID, userID });
//     await model.updatePaymentMethodByID(paymentMethodID, update);
//     return {};
//   });
// };
import {
  addPaymentMethodRequestType,
  addPaymentMethodResponseType,
  addWithdrawMethodRequestType,
  addWithdrawMethodResponseType,
  deletePaymentMethodRequestType,
  deletePaymentMethodResponseType,
  deleteWithdrawMethodRequestType,
  deleteWithdrawMethodResponseType,
  getPaymentMethodResponseType,
  getWithdrawMethodsResponseType,
  updateWithdrawMethodRequestType,
  updateWithdrawMethodResponseType,
} from 'events-tomeroko3';

import { paymentMethodUpdatedPublisher } from '../configs/rabbitMQ/initialization';
import {
  paymentMethodAddedAndVerifiedPublisher,
  paymentMethodDeletedOrDeclinedPublisher,
  withdrawMethodAddedAndVerifiedPublisher,
  withdrawMethodDeletedOrDeclinedPublisher,
  withdrawMethodUpdatedPublisher,
} from '../configs/rabbitMQ/initialization';

import * as model from './DAL';
import { AppErrorCodes } from './appErrorCodes';

export const getUserPaymentMethods = async (): Promise<getPaymentMethodResponseType['body']> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserById(userID);
    if (!user) {
      throw new AppError(AppErrorCodes.GET_PAYMENT_METHODS_USER_NOT_FOUND, { userID });
    }
    const paymentMethods = await model.getPaymentMethodsByUserId(userID);
    const result: getPaymentMethodResponseType['body']['withdrawMethods'] = paymentMethods.map((paymentMethod) => {
      const restructued: getPaymentMethodResponseType['body']['withdrawMethods'][number] = {
        cvv: paymentMethod.cvv,
        expirationDate: paymentMethod.expirationDate,
        holderID: paymentMethod.holderID,
        holderName: paymentMethod.holderName,
        number: paymentMethod.number,
        postalCode: paymentMethod.postalCode,
      };
      return restructued;
    });

    return { withdrawMethods: result };
  });
};

export const addPaymentMethod = async (props: addPaymentMethodRequestType['body']): Promise<addPaymentMethodResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserById(userID);
    if (!user) {
      throw new AppError(AppErrorCodes.ADD_PAYMENT_METHOD_USER_NOT_FOUND, { userID });
    }
    const newPaymentMethod = await model.insertPaymentMethod({ ...props, userID });
    paymentMethodAddedAndVerifiedPublisher({ paymentMethodID: newPaymentMethod.ID, userID });
    return { paymentMethodID: newPaymentMethod.ID };
  });
};

export const deletePaymentMethod = async (
  props: deletePaymentMethodRequestType['body'],
): Promise<deletePaymentMethodResponseType> => {
  return functionWrapper(async () => {
    const { paymentMethodID } = props;
    const userID = getAuthenticatedID() as string;
    const paymentMethod = await model.getPaymentMethodById(paymentMethodID);
    if (!paymentMethod) {
      throw new AppError(AppErrorCodes.DELETE_PAYMENT_METHOD_NOT_FOUND, { paymentMethodID });
    }
    if (paymentMethod.userID !== userID) {
      throw new AppError(AppErrorCodes.DELETE_PAYMENT_METHOD_WRONG_USER_ID, { paymentMethodID, userID });
    }
    await model.deletePaymentMethodByID(paymentMethodID);
    paymentMethodDeletedOrDeclinedPublisher({ paymentMethodID, userID });
    return {};
  });
};

export const updatePaymentMethod = async (
  props: updatePaymentMethodRequestType['body'],
): Promise<updatePaymentMethodResponseType> => {
  return functionWrapper(async () => {
    const { paymentMethod: update, paymentMethodID } = props;
    const userID = getAuthenticatedID() as string;
    const paymentMethod = await model.getPaymentMethodById(paymentMethodID);
    if (!paymentMethod) {
      throw new AppError(AppErrorCodes.UPDATE_PAYMENT_METHOD_NOT_FOUND, { paymentMethodID });
    }
    if (paymentMethod.userID !== userID) {
      throw new AppError(AppErrorCodes.UPDATE_PAYMENT_METHOD_WRONG_USER_ID, { paymentMethodID, userID });
    }
    await model.updatePaymentMethodByID(paymentMethodID, update);
    paymentMethodUpdatedPublisher({ paymentMethodID, userID });
    return {};
  });
};

export const getUserWithdrawMethods = async (): Promise<getWithdrawMethodsResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserById(userID);
    if (!user) {
      throw new AppError(AppErrorCodes.GET_WITHDRAW_METHODS_USER_NOT_FOUND, { userID });
    }
    const withdrawMethods = await model.getWithdrawMethodsByUserId(userID);
    return { withdrawMethods };
  });
};

export const addWithdrawMethod = async (props: addWithdrawMethodRequestType['body']): Promise<addWithdrawMethodResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserById(userID);
    if (!user) {
      throw new AppError(AppErrorCodes.ADD_WITHDRAW_METHODS_USER_NOT_FOUND, { userID });
    }
    const newWithdrawMethod = await model.insertWithdrawMethod({ ...props, userID });
    withdrawMethodAddedAndVerifiedPublisher({ withdrawMethodID: newWithdrawMethod.ID, userID });
    return { withdrawMethodID: newWithdrawMethod.ID };
  });
};

export const deleteWithdrawMethod = async (
  props: deleteWithdrawMethodRequestType['body'],
): Promise<deleteWithdrawMethodResponseType> => {
  return functionWrapper(async () => {
    const { withdrawMethodID } = props;
    const userID = getAuthenticatedID() as string;
    const withdrawMethod = await model.getWithdrawMethodById(withdrawMethodID);
    if (!withdrawMethod) {
      throw new AppError(AppErrorCodes.DELETE_WITHDRAW_METHOD_NOT_FOUND, { withdrawMethodID });
    }
    if (withdrawMethod.userID !== userID) {
      throw new AppError(AppErrorCodes.DELETE_WITHDRAW_METHOD_WRONG_USER_ID, { withdrawMethodID, userID });
    }
    await model.deleteWithdrawMethodByID(withdrawMethodID);
    withdrawMethodDeletedOrDeclinedPublisher({ withdrawMethodID, userID });
    return {};
  });
};

export const updateWithdrawMethod = async (
  props: updateWithdrawMethodRequestType['body'],
): Promise<updateWithdrawMethodResponseType> => {
  return functionWrapper(async () => {
    const { bankAccount: update, bankAccountID } = props;
    const userID = getAuthenticatedID() as string;
    const withdrawMethod = await model.getWithdrawMethodById(bankAccountID);
    if (!withdrawMethod) {
      throw new AppError(AppErrorCodes.UPDATE_WITHDRAW_METHOD_NOT_FOUND, { withdrawMethodID: bankAccountID });
    }
    if (withdrawMethod.userID !== userID) {
      throw new AppError(AppErrorCodes.UPDATE_WITHDRAW_METHOD_WRONG_USER_ID, { withdrawMethodID: bankAccountID, userID });
    }
    await model.updateWithdrawMethodByID(bankAccountID, update);
    withdrawMethodUpdatedPublisher({ withdrawMethodID: bankAccountID, userID });
    return {};
  });
};
