import z from 'zod';

import { AppError } from '../errors';
import { functionWrapper } from '../logging';

import { channel } from './connect';

export type RabbitPubliserParams<T> = {
  eventType: string;
  eventSchema: z.Schema<T, any, any>;
};

export const rabbitPublisherFactory = async <T>(params: RabbitPubliserParams<T>) => {
  if (!channel) {
    throw new AppError('RABBIT_CHANNEL_NOT_INITIALIZED');
  }

  const { eventType, eventSchema } = params;
  const exchange = `${eventType}_EVENTS`;
  await channel.assertExchange(exchange, 'fanout', { durable: true });

  const publisher = (data: T) => {
    return functionWrapper(() => {
      const isValid = eventSchema.safeParse(data);
      if (!isValid.success) {
        throw new AppError(`INVALID_PUBLISH_EVENT_DATA`, { error: isValid.error, eventType });
      }
      const msg = JSON.stringify({ type: eventType, data });
      channel.publish(exchange, '', Buffer.from(msg), { persistent: true });
    });
  };

  return publisher;
};
