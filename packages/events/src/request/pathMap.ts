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
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  deletePaymentMethodRequestValidation,
  deletePaymentMethodResponseValidation,
  addWithdrawMethodRequestValidation,
  addWithdrawMethodResponseValidation,
  updateWithdrawMethodRequestValidation,
  updateWithdrawMethodResponseValidation,
  deleteWithdrawMethodRequestValidation,
  deleteWithdrawMethodResponseValidation,
  getPaymentMethodsRequestValidation,
  getPaymentMethodsResponseValidation,
  getWithdrawMethodsRequestValidation,
  getWithdrawMethodsResponseValidation,
} from './validation';
import path from 'path';
import {
  searchRequestValidation,
  searchResponseValidation,
  searchWithFiltersRequestValidation,
  searchWithFiltersResponseValidation,
} from './validation/search';
import { get } from 'http';

const servicesNames = {
  signup: 'signup',
  meet: 'meet',
  call: 'call',
  auth: 'auth',
  search: 'search',
  teach: 'teach',
  paymnent: 'payment',
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
  ADD_PAYMENT_METHOD: {
    path: '/add-payment-method',
    method: 'post',
    service: servicesNames.paymnent,
    requestValidation: addPaymentMethodRequestValidation,
    responseValidation: addPaymentMethodResponseValidation,
  },
  UPDATE_PAYMENT_METHOD: {
    path: '/update-payment-method',
    method: 'put',
    service: servicesNames.paymnent,
    requestValidation: updatePaymentMethodRequestValidation,
    responseValidation: updatePaymentMethodResponseValidation,
  },
  DELETE_PAYMENT_METHOD: {
    path: '/delete-payment-method',
    method: 'delete',
    service: servicesNames.paymnent,
    requestValidation: deletePaymentMethodRequestValidation,
    responseValidation: deletePaymentMethodResponseValidation,
  },
  GET_USER_PAYMENT_METHODS: {
    path: '/get-payment-methods',
    method: 'get',
    service: servicesNames.paymnent,
    requestValidation: getPaymentMethodsRequestValidation,
    responseValidation: getPaymentMethodsResponseValidation,
  },
  ADD_WITHDRAW_METHOD: {
    path: '/add-bank-account',
    method: 'post',
    service: servicesNames.paymnent,
    requestValidation: addWithdrawMethodRequestValidation,
    responseValidation: addWithdrawMethodResponseValidation,
  },
  UPDATE_WITHDRAW_METHOD: {
    path: '/update-bank-account',
    method: 'put',
    service: servicesNames.paymnent,
    requestValidation: updateWithdrawMethodRequestValidation,
    responseValidation: updateWithdrawMethodResponseValidation,
  },
  DELETE_WITHDRAW_METHOD: {
    path: '/delete-bank-account',
    method: 'delete',
    service: servicesNames.paymnent,
    requestValidation: deleteWithdrawMethodRequestValidation,
    responseValidation: deleteWithdrawMethodResponseValidation,
  },
  GET_USER_WITHDRAW_METHODS: {
    path: '/get-withdraw-methods',
    method: 'get',
    service: servicesNames.paymnent,
    requestValidation: getWithdrawMethodsRequestValidation,
    responseValidation: getWithdrawMethodsResponseValidation,
  },
} as const;
