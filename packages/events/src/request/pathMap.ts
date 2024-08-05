import { ZodSchema } from 'zod';
import {
  becomeTeacherRequestValidation,
  becomeTeacherResponseValidation,
  stopTeachRequestValidation,
  loginRequestValidation,
  loginRespondValidation,
  sendPincodeRequestValidation,
  sendPincodeRespondValidation,
  signupRequestValidation,
  signupRespondValidation,
  updateTeacherDetailsRequestValidation,
  updateTeacherDetailsResponseValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
  deleteTopicRequestValidation,
  deleteTopicResponseValidation,
} from './validation';
import path from 'path';
import {
  searchRequestValidation,
  searchResponseValidation,
  searchWithFiltersRequestValidation,
  searchWithFiltersResponseValidation,
} from './validation/search';

const servicesNames = {
  signup: 'signup',
  meet: 'meet',
  call: 'call',
  auth: 'auth',
  search: 'search',
  teach: 'teach',
} as const;

export type ServiceName = (typeof servicesNames)[keyof typeof servicesNames];

export type Path = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  requestValidation: ZodSchema<any>;
  responseValidation: ZodSchema<any>;
  service: ServiceName;
};

export const pathMap = {
  SEND_PINCODE: {
    path: '/send-pincode',
    method: 'post',
    requestValidation: sendPincodeRequestValidation,
    responseValidation: sendPincodeRespondValidation,
    service: servicesNames.signup,
  },
  SIGNUP: {
    path: '/signup',
    method: 'post',
    requestValidation: signupRequestValidation,
    responseValidation: signupRespondValidation,
    service: servicesNames.signup,
  },
  LOGIN: {
    path: '/login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: loginRequestValidation,
    responseValidation: loginRespondValidation,
  },
  SEARCH: {
    path: '/search',
    method: 'post',
    service: servicesNames.search,
    requestValidation: searchRequestValidation,
    responseValidation: searchResponseValidation,
  },
  SEARCH_WITH_FILTERS: {
    path: '/search-with-filters',
    method: 'post',
    service: servicesNames.search,
    requestValidation: searchWithFiltersRequestValidation,
    responseValidation: searchWithFiltersResponseValidation,
  },
  BECOME_TEACHER: {
    path: '/become-teacher',
    method: 'post',
    service: servicesNames.teach,
    requestValidation: becomeTeacherRequestValidation,
    responseValidation: becomeTeacherResponseValidation,
  },
  UPDATE_TEACHER_DETAILS: {
    path: '/update-teacher-details',
    method: 'put',
    service: servicesNames.teach,
    requestValidation: updateTeacherDetailsRequestValidation,
    responseValidation: updateTeacherDetailsResponseValidation,
  },
  STOP_TEACH: {
    path: '/stop-teacher',
    method: 'delete',
    service: servicesNames.teach,
    requestValidation: stopTeachRequestValidation,
    responseValidation: stopTeachRequestValidation,
  },
  ADD_TOPIC: {
    path: '/add-topic',
    method: 'post',
    service: servicesNames.teach,
    requestValidation: addTopicRequestValidation,
    responseValidation: addTopicResponseValidation,
  },
  UPDATE_TOPIC: {
    path: '/update-topic',
    method: 'put',
    service: servicesNames.teach,
    requestValidation: updateTopicRequestValidation,
    responseValidation: updateTopicResponseValidation,
  },
  DELETE_TOPIC: {
    path: '/delete-topic',
    method: 'delete',
    service: servicesNames.teach,
    requestValidation: deleteTopicRequestValidation,
    responseValidation: deleteTopicResponseValidation,
  },
} as const;
