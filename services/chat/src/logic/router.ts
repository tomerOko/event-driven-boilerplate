import { Auth, validateRequest } from 'common-lib-tomeroko3';
import 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const sendMessage = pathMap['SEND_MESSAGE'];
router.post(
  sendMessage.path,
  Auth('LOGGED_IN'),
  validateRequest(sendMessage.requestValidation, sendMessage.responseValidation),
  controller.sendMessage,
);

const createGroup = pathMap['CREATE_GROUP'];
router.post(
  createGroup.path,
  Auth('LOGGED_IN'),
  validateRequest(createGroup.requestValidation, createGroup.responseValidation),
  controller.createGroup,
);

const joinGroup = pathMap['JOIN_GROUP'];
router.post(
  joinGroup.path,
  Auth('LOGGED_IN'),
  validateRequest(joinGroup.requestValidation, joinGroup.responseValidation),
  controller.joinGroup,
);

const leaveGroup = pathMap['LEAVE_GROUP'];
router.post(
  leaveGroup.path,
  Auth('LOGGED_IN'),
  validateRequest(leaveGroup.requestValidation, leaveGroup.responseValidation),
  controller.leaveGroup,
);

const getRecentChats = pathMap['GET_RECENT_CHATS'];
router.get(
  getRecentChats.path,
  Auth('LOGGED_IN'),
  validateRequest(getRecentChats.requestValidation, getRecentChats.responseValidation),
  controller.getRecentChats,
);

const getMessages = pathMap['GET_MESSAGES'];
router.get(
  getMessages.path,
  Auth('LOGGED_IN'),
  validateRequest(getMessages.requestValidation, getMessages.responseValidation),
  controller.getMessages,
);

const searchMessages = pathMap['SEARCH_MESSAGES'];
router.get(
  searchMessages.path,
  Auth('LOGGED_IN'),
  validateRequest(searchMessages.requestValidation, searchMessages.responseValidation),
  controller.searchMessages,
);

