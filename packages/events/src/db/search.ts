import { z } from 'zod';
import { teacherValidationProps, topicValidationProps, userValidationProps } from '../shared';
export const searchDbValidations = {
  user: z.object(userValidationProps),
  teacher: z.object(teacherValidationProps),
  topic: z.object(topicValidationProps),
  connectedUser: z.object({
    userID: z.string(),
  }),
};
