import z from 'zod';

export const meetValidationProps = {
  // teacherId: IDValidation,
  // studentId: IDValidation,
  // topicId: IDValidation,
  currentTopicHourlyRate: z.number(),
  currentTopicMinimumDuration: z.number(),
  meetingDate: z.number(),
  meetingDurationMS: z.number(),
};
