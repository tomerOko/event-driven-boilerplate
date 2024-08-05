import * as z from 'zod';
import {
  becomeTeacherRequestValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  becomeTeacherResponseValidation,
  stopTeachRequestValidation,
  stopTeachResponseValidation,
  deleteTopicRequestValidation,
  deleteTopicResponseValidation,
  updateTeacherDetailsRequestValidation,
  updateTeacherDetailsResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
} from '../validation/teach';

export type becomeTeacherRequestType = z.infer<typeof becomeTeacherRequestValidation>;
export type becomeTeacherResponseType = z.infer<typeof becomeTeacherResponseValidation>;

export type updateTeacherDetailsRequestType = z.infer<typeof updateTeacherDetailsRequestValidation>;
export type updateTeacherDetailsResponseType = z.infer<typeof updateTeacherDetailsResponseValidation>;

export type stopTeachRequestType = z.infer<typeof stopTeachRequestValidation>;
export type stopTeachResponseType = z.infer<typeof stopTeachResponseValidation>;

export type addTopicRequestType = z.infer<typeof addTopicRequestValidation>;
export type addTopicResponseType = z.infer<typeof addTopicResponseValidation>;

export type updateTopicRequestType = z.infer<typeof updateTopicRequestValidation>;
export type updateTopicResponseType = z.infer<typeof updateTopicResponseValidation>;

export type deleteTopicRequestType = z.infer<typeof deleteTopicRequestValidation>;
export type deleteTopicResponseType = z.infer<typeof deleteTopicResponseValidation>;
