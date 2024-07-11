import * as amqp from 'amqplib/callback_api';
import z from 'zod';

export let channel: amqp.Channel;

export const connectRabbitMQ = async (amqpURL: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const isAlreadyConnected = channel !== undefined;
    if (isAlreadyConnected) {
      resolve();
      return;
    }
    amqp.connect(amqpURL, (error0, connection) => {
      if (error0) {
        reject(error0);
        console.error('Error connecting to RabbitMQ', error0);
      } else {
        connection.createChannel((error1, ch) => {
          if (error1) {
            reject(error1);
            console.error('Error creating RabbitMQ channel', error1);
          }
          channel = ch;
          resolve();
          console.log('Connected to RabbitMQ');
        });
      }
    });
  });
};

export const closeConnection = async () => {
  if (channel) {
    await channel.close((error) => {
      if (error) {
        console.error('Error closing RabbitMQ channel', error);
      }
    });
  }
};
