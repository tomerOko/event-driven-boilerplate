import {
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import { RabbitPublisherParams } from 'common-lib-tomeroko3';
import {
  FailedPaymentEventType,
  FailedWithrawEventType,
  PaymentMethodAddedAndVerifiedEventType,
  PaymentMethodDeletedOrDeclinedEventType,
  PaymentMethodUpdatedEventType,
  SendEmailEventType,
  SuccessfulPaymentEventType,
  SuccessfulWithrawEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
  WithrawMethodAddedAndVerifiedEventType,
  WithrawMethodDeletedOrDeclinedEventType,
  WithrawMethodUpdatedEventType,
  emailEventsNames,
  failedPaymentEventValidation,
  failedWithdrawEventValidation,
  paymentEventsNames,
  paymentMethodAddedAndVerifiedEventValidation,
  paymentMethodDeletedOrDeclinedEventValidation,
  paymentMethodUpdatedEventValidation,
  sendEmailEventValidation,
  signupEventsNames,
  successfulPaymentEventValidation,
  successfulWithdrawEventValidation,
  userCreatedEventValidation,
  userUpdatedEventValidation,
  withdrawMethodAddedAndVerifiedEventValidation,
  withdrawMethodDeletedOrDeclinedEventValidation,
  withdrawMethodUpdatedEventValidation,
} from 'events-tomeroko3';

import { handleNewUserEvent, handleUpdatedUserEvent } from '../../logic/consumers';

export let failedPaymentPublisher: (data: FailedPaymentEventType['data']) => void;
export let failedWithdrawPublisher: (data: FailedWithrawEventType['data']) => void;
export let paymentMethodAddedAndVerifiedPublisher: (data: PaymentMethodAddedAndVerifiedEventType['data']) => void;
export let paymentMethodDeletedOrDeclinedPublisher: (data: PaymentMethodDeletedOrDeclinedEventType['data']) => void;
export let paymentMethodUpdatedPublisher: (data: PaymentMethodUpdatedEventType['data']) => void;
export let emailPublisher: (data: SendEmailEventType['data']) => void;
export let successfulPaymentPublisher: (data: SuccessfulPaymentEventType['data']) => void;
export let successfulWithdrawPublisher: (data: SuccessfulWithrawEventType['data']) => void;
export let withdrawMethodAddedAndVerifiedPublisher: (data: WithrawMethodAddedAndVerifiedEventType['data']) => void;
export let withdrawMethodDeletedOrDeclinedPublisher: (data: WithrawMethodDeletedOrDeclinedEventType['data']) => void;
export let withdrawMethodUpdatedPublisher: (data: WithrawMethodUpdatedEventType['data']) => void;

const failedPaymentPublisherParams: RabbitPublisherParams<FailedPaymentEventType> = {
  eventName: paymentEventsNames.FAILED_PAYMENT,
  eventSchema: failedPaymentEventValidation,
};

const failedWithdrawPublisherParams: RabbitPublisherParams<FailedWithrawEventType> = {
  eventName: paymentEventsNames.FAILED_WITHDRAW,
  eventSchema: failedWithdrawEventValidation,
};

const paymentMethodAddedAndVerifiedPublisherParams: RabbitPublisherParams<PaymentMethodAddedAndVerifiedEventType> = {
  eventName: paymentEventsNames.PAYMENT_METHOD_ADDED_AND_VERIFIED,
  eventSchema: paymentMethodAddedAndVerifiedEventValidation,
};

const paymentMethodDeletedOrDeclinedPublisherParams: RabbitPublisherParams<PaymentMethodDeletedOrDeclinedEventType> = {
  eventName: paymentEventsNames.PAYMENT_METHOD_DELETED_OR_DECLINED,
  eventSchema: paymentMethodDeletedOrDeclinedEventValidation,
};

const paymentMethodUpdatedPublisherParams: RabbitPublisherParams<PaymentMethodUpdatedEventType> = {
  eventName: paymentEventsNames.PAYMENT_METHOD_UPDATED,
  eventSchema: paymentMethodUpdatedEventValidation,
};

const successfulPaymentPublisherParams: RabbitPublisherParams<SuccessfulPaymentEventType> = {
  eventName: paymentEventsNames.SUCCESSFUL_PAYMENT,
  eventSchema: successfulPaymentEventValidation,
};

const successfulWithdrawPublisherParams: RabbitPublisherParams<SuccessfulWithrawEventType> = {
  eventName: paymentEventsNames.SUCCESSFUL_WITHDRAW,
  eventSchema: successfulWithdrawEventValidation,
};

const withdrawMethodAddedAndVerifiedPublisherParams: RabbitPublisherParams<WithrawMethodAddedAndVerifiedEventType> = {
  eventName: paymentEventsNames.WITHDRAW_METHOD_ADDED_AND_VERIFIED,
  eventSchema: withdrawMethodAddedAndVerifiedEventValidation,
};

const withdrawMethodDeletedOrDeclinedPublisherParams: RabbitPublisherParams<WithrawMethodDeletedOrDeclinedEventType> = {
  eventName: paymentEventsNames.WITHDRAW_METHOD_DELETED_OR_DECLINED,
  eventSchema: withdrawMethodDeletedOrDeclinedEventValidation,
};

const withdrawMethodUpdatedPublisherParams: RabbitPublisherParams<WithrawMethodUpdatedEventType> = {
  eventName: paymentEventsNames.WITHDRAW_METHOD_UPDATED,
  eventSchema: withdrawMethodUpdatedEventValidation,
};

const emailPublisherParams: RabbitPublisherParams<SendEmailEventType> = {
  eventName: emailEventsNames.SEND_EMAIL,
  eventSchema: sendEmailEventValidation,
};

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'PAYMENT_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleNewUserEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'PAYMENT_SERVICE',
  eventName: signupEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
  handler: handleUpdatedUserEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    failedPaymentPublisher = await rabbitPublisherFactory(failedPaymentPublisherParams);
    failedWithdrawPublisher = await rabbitPublisherFactory(failedWithdrawPublisherParams);
    paymentMethodAddedAndVerifiedPublisher = await rabbitPublisherFactory(paymentMethodAddedAndVerifiedPublisherParams);
    paymentMethodDeletedOrDeclinedPublisher = await rabbitPublisherFactory(paymentMethodDeletedOrDeclinedPublisherParams);
    paymentMethodUpdatedPublisher = await rabbitPublisherFactory(paymentMethodUpdatedPublisherParams);
    emailPublisher = await rabbitPublisherFactory(emailPublisherParams);
    successfulPaymentPublisher = await rabbitPublisherFactory(successfulPaymentPublisherParams);
    successfulWithdrawPublisher = await rabbitPublisherFactory(successfulWithdrawPublisherParams);
    withdrawMethodAddedAndVerifiedPublisher = await rabbitPublisherFactory(withdrawMethodAddedAndVerifiedPublisherParams);
    withdrawMethodDeletedOrDeclinedPublisher = await rabbitPublisherFactory(withdrawMethodDeletedOrDeclinedPublisherParams);
    withdrawMethodUpdatedPublisher = await rabbitPublisherFactory(withdrawMethodUpdatedPublisherParams);

    initializeRabbitSubscriber(userCreatedSubscriberParams);
    initializeRabbitSubscriber(userUpdatedSubscriberParams);
  });
};
