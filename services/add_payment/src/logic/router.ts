import express from 'express';

import * as controller from './controller';

export const router = express.Router();

/* GET */
router.get(
  '/test',
  controller.test,
);

router.get(
  '/allUsers',
  controller.getAllUsers,
);

router.post(
  '/createUser',
  controller.createUser,
);

router.put(
  '/updateUser',
  controller.updateUser,
);

router.delete(
  '/deleteUser',
  controller.deleteUser,
);

