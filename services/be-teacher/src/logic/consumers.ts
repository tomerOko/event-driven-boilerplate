import { User } from './validations';

export const handleUserEvent = async (user: User) => {
  console.error('new user created', user);
};
