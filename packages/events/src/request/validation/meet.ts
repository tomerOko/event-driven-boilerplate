import { z } from 'zod';

export const connetMeetRequestValidation = z.object({
  secondUserId: z.string(),
  peer: z.string(),
});
