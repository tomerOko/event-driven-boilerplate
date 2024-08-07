import { z } from 'zod';
import { teacherValidationPropsMinimal, topicValidationPropsMinimal } from '../../shared/validations/teach';

export const becomeTeacherRequestValidation = z.object({
  body: z.object(teacherValidationPropsMinimal),
});

export const becomeTeacherResponseValidation = z.object({
  teacherID: z.string(),
});

export const updateTeacherDetailsRequestValidation = z.object({
  body: z.object({
    teacherID: z.string(),
    teacher: z.object(teacherValidationPropsMinimal).partial(),
  }),
});

export const updateTeacherDetailsResponseValidation = z.object({});

export const stopTeachRequestValidation = z.object({
  body: z.object({
    teacherID: z.string(),
  }),
});

export const stopTeachResponseValidation = z.object({});

export const addTopicRequestValidation = z.object({
  body: z.object(topicValidationPropsMinimal),
});

export const addTopicResponseValidation = z.object({
  topicID: z.string(),
});

export const updateTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
    topic: z.object(topicValidationPropsMinimal).partial(),
  }),
});

export const updateTopicResponseValidation = z.object({});

export const deleteTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
  }),
});

export const deleteTopicResponseValidation = z.object({});
