import * as amqp from 'amqplib/callback_api';

import { ENVs } from './ENVs';

const { host, password, port, username } = ENVs.rabbit;

const connectionString = `amqp://${username}:${password}@${host}:${port}`;

export let channel: amqp.Channel;

export const connectRabbitMQ = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    amqp.connect(connectionString, (error0, connection) => {
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
