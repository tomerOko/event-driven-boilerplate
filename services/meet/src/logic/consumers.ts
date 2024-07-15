import { UserCreatedEventType } from 'events-tomeroko3';

export const handleUserEvent = async (user: UserCreatedEventType['data']) => {
  console.error('new user created', user);
};
