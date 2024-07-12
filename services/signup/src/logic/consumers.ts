import { UserCreatedEventType } from 'events-tomeroko3';

import { User } from './validations';

export const handleUserEvent = async (user: UserCreatedEventType['data']) => {
  console.error('new user created', user);
};
