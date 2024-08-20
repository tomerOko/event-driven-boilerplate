import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const getUserPaymentMethods = pathMap['GET_USER_PAYMENT_METHODS'];
router.get(
  getUserPaymentMethods.path,
  validateRequest(getUserPaymentMethods.requestValidation, getUserPaymentMethods.responseValidation),
  controller.getUserPaymentMethods,
);

const addPaymentMethod = pathMap['ADD_PAYMENT_METHOD'];
router.post(
  addPaymentMethod.path,
  validateRequest(addPaymentMethod.requestValidation, addPaymentMethod.responseValidation),
  controller.addPaymentMethod,
);

const deletePaymentMethod = pathMap['DELETE_PAYMENT_METHOD'];
router.post(
  deletePaymentMethod.path,
  validateRequest(deletePaymentMethod.requestValidation, deletePaymentMethod.responseValidation),
  controller.deletePaymentMethod,
);

const updatePaymentMethod = pathMap['UPDATE_PAYMENT_METHOD'];
router.post(
  updatePaymentMethod.path,
  validateRequest(updatePaymentMethod.requestValidation, updatePaymentMethod.responseValidation),
  controller.updatePaymentMethod,
);

const getUserWithdrawMethods = pathMap['GET_USER_WITHDRAW_METHODS'];
router.get(
  getUserWithdrawMethods.path,
  validateRequest(getUserWithdrawMethods.requestValidation, getUserWithdrawMethods.responseValidation),
  controller.getUserWithdrawMethods,
);

const addWithdrawMethod = pathMap['ADD_WITHDRAW_METHOD'];
router.post(
  addWithdrawMethod.path,
  validateRequest(addWithdrawMethod.requestValidation, addWithdrawMethod.responseValidation),
  controller.addWithdrawMethod,
);

const deleteWithdrawMethod = pathMap['DELETE_WITHDRAW_METHOD'];
router.post(
  deleteWithdrawMethod.path,
  validateRequest(deleteWithdrawMethod.requestValidation, deleteWithdrawMethod.responseValidation),
  controller.deleteWithdrawMethod,
);

const updateWithdrawMethod = pathMap['UPDATE_WITHDRAW_METHOD'];
router.post(
  updateWithdrawMethod.path,
  validateRequest(updateWithdrawMethod.requestValidation, updateWithdrawMethod.responseValidation),
  controller.updateWithdrawMethod,
);
