import { z } from 'zod';
import {
  teacherValidationProps,
  teacherValidationPropsWithoutID,
  topicValidationPropsWithoutID,
} from '../../shared/validations/teach';

export const becomeTeacherRequestValidation = z.object({
  body: z.object(teacherValidationPropsWithoutID),
});

export const becomeTeacherResponseValidation = z.object({
  body: z.object({
    teacherID: z.string(),
  }),
});

export const updateTeacherDetailsRequestValidation = z.object({
  body: z.object({
    teacherID: z.string(),
    teacher: z.object(teacherValidationPropsWithoutID).partial(),
  }),
});

export const updateTeacherDetailsResponseValidation = z.object({
  body: z.object({}),
});

export const stopTeachRequestValidation = z.object({
  params: z.object({
    teacherID: z.string(),
  }),
});

export const stopTeachResponseValidation = z.object({
  body: z.object({}),
});

export const addTopicRequestValidation = z.object({
  body: z.object(topicValidationPropsWithoutID),
});

export const addTopicResponseValidation = z.object({
  body: z.object({
    topicID: z.string(),
  }),
});

export const updateTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
    topic: z.object(topicValidationPropsWithoutID).partial(),
  }),
});

export const updateTopicResponseValidation = z.object({
  body: z.object({}),
});

export const deleteTopicRequestValidation = z.object({
  params: z.object({
    topicID: z.string(),
  }),
});

export const deleteTopicResponseValidation = z.object({
  body: z.object({}),
});
