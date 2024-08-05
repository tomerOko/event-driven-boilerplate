import { z } from 'zod';
import { teacherValidationProps, topicValidationProps, userValidationProps, userValidationWithoutPasswordProps } from '../shared';
export const teachDbValidations = {
  user: z.object(userValidationWithoutPasswordProps),
  teacher: z.object({
    ...userValidationWithoutPasswordProps,
    ...teacherValidationProps,
  }),
  topic: z.object(topicValidationProps),
};
