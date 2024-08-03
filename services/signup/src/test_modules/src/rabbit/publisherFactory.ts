import z from 'zod';

import { AppError } from '../errors';
import { functionWrapper } from '../logging';

import { channel } from './connect';
import { EventStracture } from './types';

export type RabbitPublisherParams<T extends EventStracture> = {
  eventName: string;
  eventSchema: z.Schema<T, any, any>;
};

export const rabbitPublisherFactory = async <T extends EventStracture>(params: RabbitPublisherParams<T>) => {
  if (!channel) {
    throw new AppError('RABBIT_CHANNEL_NOT_INITIALIZED');
  }

  const { eventName, eventSchema } = params;
  const exchange = `${eventName}_EVENTS`;
  await channel.assertExchange(exchange, 'fanout', { durable: true });

  const publisher = (data: T['data']) => {
    return functionWrapper(() => {
      const event = { type: eventName, data };
      const isValid = eventSchema.safeParse(event);
      if (!isValid.success) {
        throw new AppError(`INVALID_PUBLISH_EVENT_DATA`, { error: isValid.error, eventName });
      }
      const msg = JSON.stringify(event);
      channel.publish(exchange, '', Buffer.from(msg), { persistent: true });
    });
  };

  return publisher;
};
