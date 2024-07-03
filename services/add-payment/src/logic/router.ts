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

router.post(
  '/createPayment',
  controller.createPayment,
);

router.put(
  '/updatePayment',
  controller.updatePayment,
);

router.delete(
  '/deletePayment',
  controller.deletePayment,
);

