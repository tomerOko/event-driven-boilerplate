import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { chatsCollection, messagesCollection, groupsCollection, usersCollection } from '../configs/mongoDB/initialization';
import { Chat, Message, Group, User } from '../configs/mongoDB/initialization';

export const createMessage = async (message: OptionalID<Message>) => {
  return functionWrapper(async () => {
    const ID = await messagesCollection.insertOne(message);
    return ID;
  });
};

export const getMessagesByChatId = async (chatId: string, limit: number, offset: number) => {
  return functionWrapper(async () => {
    const messages = await messagesCollection.find({ chatId })
      .sort({ timestamp: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
    return messages;
  });
};

export const createChat = async (chat: OptionalID<Chat>) => {
  return functionWrapper(async () => {
    const ID = await chatsCollection.insertOne(chat);
    return ID;
  });
};

export const getChatById = async (chatId: string) => {
  return functionWrapper(async () => {
    const chat = await chatsCollection.findOne({ ID: chatId });
    return chat;
  });
};

export const createGroup = async (group: OptionalID<Group>) => {
  return functionWrapper(async () => {
    const ID = await groupsCollection.insertOne(group);
    return ID;
  });
};

export const getGroupById = async (groupId: string) => {
  return functionWrapper(async () => {
    const group = await groupsCollection.findOne({ ID: groupId });
    return group;
  });
};

export const addUserToGroup = async (groupId: string, userId: string) => {
  return functionWrapper(async () => {
    await groupsCollection.updateOne(
      { ID: groupId },
      { $addToSet: { participants: userId } }
    );
  });
};

export const removeUserFromGroup = async (groupId: string, userId: string) => {
  return functionWrapper(async () => {
    await groupsCollection.updateOne(
      { ID: groupId },
      { $pull: { participants: userId } }
    );
  });
};

export const getUserById = async (userId: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID: userId });
    return user;
  });
};

export const updateUserLastSeen = async (userId: string, lastSeen: Date) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne(
      { ID: userId },
      { $set: { lastSeen } }
    );
  });
};

export const getRecentChats = async (userId: string, limit: number) => {
  return functionWrapper(async () => {
    const recentChats = await chatsCollection.find(
      { participants: userId }
    )
      .sort({ lastMessageAt: -1 })
      .limit(limit)
      .toArray();
    return recentChats;
  });
};

export const updateChatLastMessage = async (chatId: string, lastMessageAt: Date) => {
  return functionWrapper(async () => {
    await chatsCollection.updateOne(
      { ID: chatId },
      { $set: { lastMessageAt } }
    );
  });
};

export const searchMessages = async (userId: string, query: string, limit: number) => {
  return functionWrapper(async () => {
    const messages = await messagesCollection.find(
      {
        $and: [
          { $or: [{ senderId: userId }, { 'chat.participants': userId }] },
          { content: { $regex: query, $options: 'i' } }
        ]
      }
    )
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
    return messages;
  });
};