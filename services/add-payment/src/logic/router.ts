import express from 'express';

import * as controller from './controller';

export const router = express.Router();

/* GET */
router.get(
  '/test',
  controller.test,
);


