import { UserCreatedEventType } from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';

export const handleUserEvent = async (user: UserCreatedEventType['data']) => {
  usersCollection.insertOne(user);
};
