import { validateRequest } from 'common-lib-tomeroko3';
import express from 'express';

import * as controller from './controller';
import * as validations from './validations';

export const router = express.Router();

router.get('/test', controller.test);

router.get('/allPayments', controller.getAllPayments);

router.post('/payment', validateRequest(validations.createPaymen), controller.createPayment);

router.put('/payment', validateRequest(validations.updatePaymentValidation), controller.updatePayment);

router.delete('/payment/:paymentId', validateRequest(validations.deletePaymentValidation), controller.deletePayment);

router.get('/payment/:paymentId', validateRequest(validations.getPaymentByIdValidation), controller.getPaymentById);
