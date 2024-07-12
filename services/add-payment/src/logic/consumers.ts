import { UserCreatedEventType } from 'events-tomeroko3';

import { getUserByEmail, saveNewUser } from './DAL';

export const handleUserEvent = async (user: UserCreatedEventType['data']) => {
  try {
    console.log('Handling user event', user);
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
      return;
    }
    await saveNewUser(user);
  } catch (error) {
    console.error('Error handling user event', error);
  }
};
