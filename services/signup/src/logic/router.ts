import express from 'express';

import * as controller from './controller';

export const router = express.Router();

/* GET */
router.get(
  '/test',
  controller.test,
);

router.get(
  '/allPayments',
  controller.getAllPayments,
);

router.get(
  '/payment/:paymentId',
  controller.getPaymentById,
);

router.post(
  '/payment',
  controller.createPayment,
);

router.put(
  '/payment',
  controller.updatePayment,
);

router.delete(
  '/payment/:paymentId',
  controller.deletePayment,
);

