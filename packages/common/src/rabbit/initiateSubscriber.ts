import * as amqp from 'amqplib';
import z from 'zod';

import { AppError } from '../errors';

import { channel } from './connect';

export type RabbitSubscriberParams<T> = {
  thisServiceName: string;
  eventType: string;
  eventSchema: z.Schema<T, any, any>;
  handler: (data: T) => Promise<void>;
};

export const initiateRabbitSubsciber = async <T>(params: RabbitSubscriberParams<T>): Promise<void> => {
  if (!channel) {
    throw new AppError('RABBIT_CHANNEL_NOT_INITIALIZED');
  }

  const { thisServiceName, eventType } = params;

  const exchange = `${eventType}_EVENTS`;
  const queue = `${eventType}_${thisServiceName}_QUEUE`;
  const deadLetterExchange = 'dead_letter_exchange';

  await channel.assertExchange(exchange, 'fanout', { durable: true });
  await channel.assertExchange(deadLetterExchange, 'direct', { durable: true });
  await channel.assertQueue(queue, {
    durable: true,
    deadLetterExchange: deadLetterExchange,
    deadLetterRoutingKey: `${thisServiceName}_dead_letter`,
  });
  await channel.bindQueue(queue, exchange, '');

  const options = { noAck: false };
  channel.consume(queue, consumeCallbackFactory<T>(params), options);
};

const consumeCallbackFactory = <T>(params: RabbitSubscriberParams<T>): ((msg: amqp.Message | null) => void) => {
  const { eventType, eventSchema, handler } = params;
  const callback = async (msg: amqp.Message | null) => {
    if (msg !== null) {
      const message = JSON.parse(msg!.content.toString());
      if (!message) {
        channel.ack(msg);
      } else {
        const isValid = eventSchema.safeParse(message.data);
        if (!isValid.success) {
          throw new AppError('INVALID_CONSUMED_EVENT_DATA', { error: isValid.error, eventType });
        }
        try {
          await handler(message);
          channel.ack(msg);
        } catch (error) {
          channel.nack(msg, false, true);
        }
      }
    }
  };
  return callback;
};

// async function handleDeadLetters(serviceName: string) {
//   const connection = await amqp.connect('amqp://rabbitmq');
//   const channel = await connection.createChannel();
//   const deadLetterQueue = `${serviceName}_dead_letter_queue`;

//   await channel.assertQueue(deadLetterQueue, { durable: true });

//   channel.consume(deadLetterQueue, async (msg) => {
//     if (msg !== null) {
//       const order: OrderCompletedEvent = JSON.parse(msg.content.toString());
//       console.log(`${serviceName} retrying order completed event`, order);

//       try {
//         // Process the order (pseudo-code)
//         await processOrder(order);

//         channel.ack(msg);
//       } catch (error) {
//         console.error(`${serviceName} failed to process order on retry`, error);
//         const retries = (msg.properties.headers['x-death'] || []).length;

//         if (retries >= 5) {
//           await channel.sendToQueue('unhandled_events', Buffer.from(JSON.stringify(order)), { persistent: true });
//           channel.ack(msg);
//         } else {
//           setTimeout(() => channel.nack(msg, false, true), 30000);
//         }
//       }
//     }
//   });
// }