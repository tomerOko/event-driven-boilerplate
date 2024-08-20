import { functionWrapper } from 'common-lib-tomeroko3';
import { UserCreatedEventType, UserUpdatedEventType } from 'events-tomeroko3';

import { insertUser, updateUser } from './DAL';

export const handleNewUserEvent = async (user: UserCreatedEventType['data']) => {
  return functionWrapper(async () => {
    await insertUser(user);
  });
};

export const handleUpdatedUserEvent = async (user: UserUpdatedEventType['data']) => {
  return functionWrapper(async () => {
    await updateUser(user.ID, user);
  });
};
