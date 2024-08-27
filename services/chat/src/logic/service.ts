import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  sendMessageRequestType,
  sendMessageResponseType,
  createGroupRequestType,
  createGroupResponseType,
  joinGroupRequestType,
  joinGroupResponseType,
  leaveGroupRequestType,
  leaveGroupResponseType,
  getRecentChatsRequestType,
  getRecentChatsResponseType,
  getMessagesRequestType,
  getMessagesResponseType,
  searchMessagesRequestType,
  searchMessagesResponseType,
} from 'events-tomeroko3';

import {
  messageSentPublisher,
  groupCreatedPublisher,
  userJoinedGroupPublisher,
  userLeftGroupPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';
import { uploadToS3, getS3Url } from '../utils/s3Utils';

export const sendMessage = async (props: sendMessageRequestType['body']): Promise<sendMessageResponseType> => {
  return functionWrapper(async () => {
    const senderId = getAuthenticatedID() as string;
    const { chatId, content, type } = props;

    let messageContent = content;
    if (type === 'voice' || type === 'image') {
      messageContent = await uploadToS3(content, type);
    }

    const message = {
      senderId,
      chatId,
      content: messageContent,
      type,
      timestamp: new Date(),
    };

    const messageId = await model.createMessage(message);
    messageSentPublisher({ ...message, id: messageId });

    return { messageId };
  });
};

export const createGroup = async (props: createGroupRequestType['body']): Promise<createGroupResponseType> => {
  return functionWrapper(async () => {
    const adminId = getAuthenticatedID() as string;
    const { name, participants } = props;

    const group = {
      name,
      adminId,
      participants: [adminId, ...participants],
      createdAt: new Date(),
    };

    const groupId = await model.createGroup(group);
    groupCreatedPublisher({ ...group, id: groupId });

    return { groupId };
  });
};

export const joinGroup = async (props: joinGroupRequestType['body']): Promise<joinGroupResponseType> => {
  return functionWrapper(async () => {
    const userId = getAuthenticatedID() as string;
    const { groupId } = props;

    const group = await model.getGroupById(groupId);
    if (!group) {
      throw new AppError(appErrorCodes.GROUP_NOT_FOUND, { groupId });
    }

    if (group.participants.includes(userId)) {
      throw new AppError(appErrorCodes.USER_ALREADY_IN_GROUP, { groupId, userId });
    }

    await model.addUserToGroup(groupId, userId);
    userJoinedGroupPublisher({ groupId, userId });

    return {};
  });
};

export const leaveGroup = async (props: leaveGroupRequestType['body']): Promise<leaveGroupResponseType> => {
  return functionWrapper(async () => {
    const userId = getAuthenticatedID() as string;
    const { groupId } = props;

    const group = await model.getGroupById(groupId);
    if (!group) {
      throw new AppError(appErrorCodes.GROUP_NOT_FOUND, { groupId });
    }

    if (!group.participants.includes(userId)) {
      throw new AppError(appErrorCodes.USER_NOT_IN_GROUP, { groupId, userId });
    }

    await model.removeUserFromGroup(groupId, userId);
    userLeftGroupPublisher({ groupId, userId });

    return {};
  });
};

export const getRecentChats = async (props: getRecentChatsRequestType['query']): Promise<getRecentChatsResponseType> => {
  return functionWrapper(async () => {
    const userId = getAuthenticatedID() as string;
    const { limit = 20 } = props;

    const recentChats = await model.getRecentChats(userId, limit);

    return {
      chats: recentChats.map(chat => ({
        ...chat,
        lastMessage: chat.lastMessage ? {
          ...chat.lastMessage,
          content: chat.lastMessage.type !== 'text' ? getS3Url(chat.lastMessage.content) : chat.lastMessage.content
        } : null
      }))
    };
  });
};

export const getMessages = async (props: getMessagesRequestType['query']): Promise<getMessagesResponseType> => {
  return functionWrapper(async () => {
    const userId = getAuthenticatedID() as string;
    const { chatId, limit = 50, offset = 0 } = props;

    const chat = await model.getChatById(chatId);
    if (!chat) {
      throw new AppError(appErrorCodes.CHAT_NOT_FOUND, { chatId });
    }

    if (!chat.participants.includes(userId)) {
      throw new AppError(appErrorCodes.USER_NOT_IN_CHAT, { chatId, userId });
    }

    const messages = await model.getMessagesByChatId(chatId, limit, offset);

    return {
      messages: messages.map(message => ({
        ...message,
        content: message.type !== 'text' ? getS3Url(message.content) : message.content
      }))
    };
  });
};

export const searchMessages = async (props: searchMessagesRequestType['query']): Promise<searchMessagesResponseType> => {
  return functionWrapper(async () => {
    const userId = getAuthenticatedID() as string;
    const { query, limit = 20 } = props;

    const messages = await model.searchMessages(userId, query, limit);

    return {
      messages: messages.map(message => ({
        ...message,
        content: message.type !== 'text' ? getS3Url(message.content) : message.content
      }))
    };
  });
};