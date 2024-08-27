import { UserCreatedEventType, MessageSentEventType } from 'events-tomeroko3';
import { usersCollection, messagesCollection } from '../configs/mongoDB/initialization';
import { uploadToS3 } from '../utils/s3Utils';

export const handleUserEvent = async (user: UserCreatedEventType['data']) => {
  await usersCollection.insertOne(user);
};

export const handleMessageSent = async (message: MessageSentEventType['data']) => {
  if (message.type === 'text') {
    await messagesCollection.insertOne(message);
  } else if (message.type === 'voice' || message.type === 'image') {
    const s3Key = await uploadToS3(message.content, message.type);
    await messagesCollection.insertOne({ ...message, content: s3Key });
  }
};