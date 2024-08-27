import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { chatDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { user, chat, message, group } = chatDbValidations;

export type User = z.infer<typeof user>;
export type Chat = z.infer<typeof chat>;
export type Message = z.infer<typeof message>;
export type Group = z.infer<typeof group>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const chatsInitializerProps: CollectionInitializerProps<Chat> = {
  collectionName: 'chats',
  documentSchema: chat,
  indexSpecs: [
    { key: { participants: 1 } },
    { key: { createdAt: 1 } },
  ],
};

const messagesInitializerProps: CollectionInitializerProps<Message> = {
  collectionName: 'messages',
  documentSchema: message,
  indexSpecs: [
    { key: { chatId: 1 } },
    { key: { senderId: 1 } },
    { key: { timestamp: 1 } },
  ],
};

const groupsInitializerProps: CollectionInitializerProps<Group> = {
  collectionName: 'groups',
  documentSchema: group,
  indexSpecs: [
    { key: { name: 1 }, unique: true },
    { key: { adminId: 1 } },
  ],
};

export let usersCollection: SafeCollection<User>;
export let chatsCollection: SafeCollection<Chat>;
export let messagesCollection: SafeCollection<Message>;
export let groupsCollection: SafeCollection<Group>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    chatsCollection = await collectionInitializer(chatsInitializerProps);
    messagesCollection = await collectionInitializer(messagesInitializerProps);
    groupsCollection = await collectionInitializer(groupsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await chatsCollection.deleteMany({});
    await messagesCollection.deleteMany({});
    await groupsCollection.deleteMany({});
  });
};